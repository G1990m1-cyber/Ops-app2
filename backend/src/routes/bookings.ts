import { Router } from 'express';
import { prisma } from '../index';
import { authenticate } from './auth';

const router = Router();
router.use(authenticate);

router.get('/', async (req: any, res) => {
  try {
    const { propertyId, status } = req.query;
    const where: any = {};
    if (propertyId) where.propertyId = propertyId;
    if (status) where.status = status;
    const bookings = await prisma.booking.findMany({
      where,
      include: { property: true },
      orderBy: { checkIn: 'desc' },
    });
    res.json(bookings);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: req.params.id },
      include: { property: true, preCheckIn: true, postCheckOut: true },
    });
    if (!booking) return res.status(404).json({ error: 'Not found' });
    res.json(booking);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = { ...req.body, checkIn: new Date(req.body.checkIn), checkOut: new Date(req.body.checkOut) };
    const booking = await prisma.booking.create({ data });
    res.status(201).json(booking);
  } catch (e: any) {
    if (e.code === 'P2002') return res.status(409).json({ error: 'Booking ref already exists' });
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const data: any = { ...req.body };
    if (data.checkIn) data.checkIn = new Date(data.checkIn);
    if (data.checkOut) data.checkOut = new Date(data.checkOut);
    delete data.id;
    const booking = await prisma.booking.update({ where: { id: req.params.id }, data });
    res.json(booking);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
