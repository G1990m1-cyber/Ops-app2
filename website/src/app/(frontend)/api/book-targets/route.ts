import { NextResponse } from 'next/server'

import { toBookTarget } from '@/utilities/booking'
import { getHotels } from '@/utilities/data'

export const revalidate = 300

export async function GET() {
  const hotels = await getHotels()
  return NextResponse.json({ hotels: hotels.map(toBookTarget) })
}
