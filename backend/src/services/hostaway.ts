import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

const HOSTAWAY_API_BASE = 'https://api.hostaway.com/v1';

// --- API client ---

async function hostawayToken(): Promise<string> {
  const accountId = process.env.HOSTAWAY_ACCOUNT_ID!;
  const apiKey = process.env.HOSTAWAY_API_KEY!;

  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: accountId,
    client_secret: apiKey,
    scope: 'general',
  });

  const res = await fetch('https://api.hostaway.com/v1/accessTokens', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!res.ok) throw new Error(`Hostaway auth failed: ${res.status}`);
  const json: any = await res.json();
  return json.access_token;
}

async function hostawayGet(path: string): Promise<any> {
  const token = await hostawayToken();
  const res = await fetch(`${HOSTAWAY_API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error(`Hostaway API error ${res.status}: ${path}`);
  return res.json();
}

// --- Webhook verification ---

export function verifyWebhookSignature(rawBody: Buffer, signature: string): boolean {
  const secret = process.env.HOSTAWAY_WEBHOOK_SECRET;
  if (!secret) return true; // skip verification if not configured
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

// --- Reservation mapping ---

interface HostawayReservation {
  id: number;
  listingMapId: number;
  channelId: number;
  channelName: string;
  guestName: string;
  guestEmail?: string;
  guestPhone?: string;
  numberOfGuests: number;
  checkInDate: string;   // YYYY-MM-DD
  checkOutDate: string;  // YYYY-MM-DD
  status: string;        // new | modified | cancelled | inquiry | declined
  reservationCode?: string;
}

function mapStatus(hostawayStatus: string): string {
  switch (hostawayStatus) {
    case 'cancelled': return 'cancelled';
    case 'new':
    case 'modified':
    case 'confirmed': return 'confirmed';
    default: return 'confirmed';
  }
}

// --- Core sync logic ---

export async function upsertReservation(
  prisma: PrismaClient,
  r: HostawayReservation
): Promise<void> {
  const property = await prisma.property.findUnique({
    where: { hostawayListingId: String(r.listingMapId) },
  });

  if (!property) {
    console.warn(`No property mapped for Hostaway listing ${r.listingMapId} — skipping`);
    return;
  }

  const bookingRef = r.reservationCode ?? `HW-${r.id}`;
  const status = mapStatus(r.status);
  const checkIn = new Date(`${r.checkInDate}T14:00:00`);
  const checkOut = new Date(`${r.checkOutDate}T11:00:00`);

  const booking = await prisma.booking.upsert({
    where: { hostawayId: String(r.id) },
    create: {
      hostawayId: String(r.id),
      bookingRef,
      guestName: r.guestName,
      guestEmail: r.guestEmail ?? null,
      guestPhone: r.guestPhone ?? null,
      propertyId: property.id,
      checkIn,
      checkOut,
      guests: r.numberOfGuests,
      status,
      source: r.channelName ?? 'hostaway',
    },
    update: {
      guestName: r.guestName,
      guestEmail: r.guestEmail ?? null,
      guestPhone: r.guestPhone ?? null,
      checkIn,
      checkOut,
      guests: r.numberOfGuests,
      status,
    },
  });

  if (status === 'cancelled') return;

  // Auto-create pre check-in task if missing
  const existing = await prisma.preCheckIn.findUnique({ where: { bookingId: booking.id } });
  if (!existing) {
    await prisma.preCheckIn.create({
      data: {
        bookingId: booking.id,
        propertyId: property.id,
        scheduledDate: new Date(checkIn.getTime() - 2 * 60 * 60 * 1000), // 2h before check-in
        status: 'pending',
        checklist: {
          create: defaultPreCheckInItems(),
        },
      },
    });
  }

  // Auto-create post check-out task if missing
  const existingPost = await prisma.postCheckOut.findUnique({ where: { bookingId: booking.id } });
  if (!existingPost) {
    await prisma.postCheckOut.create({
      data: {
        bookingId: booking.id,
        propertyId: property.id,
        scheduledDate: checkOut,
        status: 'pending',
        checklist: {
          create: defaultPostCheckOutItems(),
        },
      },
    });
  }
}

export async function cancelReservation(prisma: PrismaClient, hostawayId: string): Promise<void> {
  await prisma.booking.updateMany({
    where: { hostawayId },
    data: { status: 'cancelled' },
  });
}

// --- Full sync (pull all from Hostaway API) ---

export async function syncAllReservations(prisma: PrismaClient): Promise<{ synced: number; skipped: number }> {
  const data = await hostawayGet('/reservations?limit=100&status=new,modified,confirmed');
  const reservations: HostawayReservation[] = data.result ?? [];

  let synced = 0;
  let skipped = 0;

  for (const r of reservations) {
    try {
      await upsertReservation(prisma, r);
      synced++;
    } catch (e) {
      console.error(`Failed to sync reservation ${r.id}:`, e);
      skipped++;
    }
  }

  return { synced, skipped };
}

// --- Default checklists ---

function defaultPreCheckInItems() {
  return [
    { label: 'Keys / access codes ready' },
    { label: 'All rooms cleaned and tidy' },
    { label: 'Beds made with fresh linen' },
    { label: 'Towels supplied' },
    { label: 'Welcome pack stocked' },
    { label: 'Heating / cooling set' },
    { label: 'All appliances functioning' },
    { label: 'No visible damage' },
  ];
}

function defaultPostCheckOutItems() {
  return [
    { label: 'Keys / access codes collected or reset' },
    { label: 'Full property inspection' },
    { label: 'Damage check completed' },
    { label: 'Lost property check' },
    { label: 'All rubbish removed' },
    { label: 'Cleaning completed' },
    { label: 'Linen stripped and sent to laundry' },
    { label: 'Meter readings taken' },
  ];
}
