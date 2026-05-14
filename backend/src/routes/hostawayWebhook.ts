import { Router, Request, Response } from 'express';
import { prisma } from '../index';
import { verifyWebhookSignature, upsertReservation, cancelReservation, syncAllReservations } from '../services/hostaway';
import { authenticate, requireRole } from './auth';

const router = Router();

// Webhook receiver — no JWT auth, but signature-verified
// Hostaway sends raw JSON; we need the raw body for HMAC verification
router.post('/webhook', (req: Request, res: Response) => {
  (async () => {
    try {
      const signature = req.headers['x-hostaway-signature'] as string ?? '';
      const rawBody: Buffer = (req as any).rawBody;

      if (rawBody && signature) {
        if (!verifyWebhookSignature(rawBody, signature)) {
          return res.status(401).json({ error: 'Invalid signature' });
        }
      }

      const payload = req.body;
      const event: string = payload?.event ?? '';
      const reservation = payload?.data ?? payload?.reservation ?? payload;

      if (!reservation?.id) {
        return res.status(400).json({ error: 'No reservation data' });
      }

      if (event === 'reservation.cancelled' || reservation.status === 'cancelled') {
        await cancelReservation(prisma, String(reservation.id));
      } else {
        await upsertReservation(prisma, reservation);
      }

      res.json({ ok: true });
    } catch (e: any) {
      console.error('Hostaway webhook error:', e);
      res.status(500).json({ error: 'Webhook processing failed' });
    }
  })();
});

// Manual full sync — admin/manager only
router.post('/sync', authenticate, requireRole(['admin', 'manager']), (req: Request, res: Response) => {
  (async () => {
    try {
      const result = await syncAllReservations(prisma);
      res.json({ ok: true, ...result });
    } catch (e: any) {
      console.error('Hostaway sync error:', e);
      res.status(500).json({ error: e.message ?? 'Sync failed' });
    }
  })();
});

export default router;
