import { Router } from 'express';
import { prisma } from '../index';
import { authenticate } from './auth';

const router = Router();
router.use(authenticate);

router.get('/stats', async (_req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);

    const [
      checkInsToday,
      checkInsTomorrow,
      checkOutsToday,
      openActionItems,
      pendingApprovals,
      openWorkTickets,
      propertiesOccupied,
      propertiesTotal,
    ] = await Promise.all([
      prisma.booking.count({ where: { checkIn: { gte: today, lt: tomorrow } } }),
      prisma.booking.count({ where: { checkIn: { gte: tomorrow, lt: dayAfter } } }),
      prisma.booking.count({ where: { checkOut: { gte: today, lt: tomorrow } } }),
      prisma.actionItem.count({ where: { status: { not: 'completed' } } }),
      prisma.approval.count({ where: { status: 'in_progress' } }),
      prisma.workTicket.count({ where: { status: { in: ['open', 'in_progress'] } } }),
      prisma.booking.count({ where: { status: 'checked_in' } }),
      prisma.property.count({ where: { active: true } }),
    ]);

    res.json({
      checkInsToday,
      checkInsTomorrow,
      checkOutsToday,
      openActionItems,
      pendingApprovals,
      openWorkTickets,
      propertiesOccupied,
      propertiesTotal,
    });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
