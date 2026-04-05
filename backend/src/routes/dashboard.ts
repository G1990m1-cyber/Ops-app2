import { Router } from 'express';
import { prisma } from '../index';
import { authenticate } from './auth';

const router = Router();
router.use(authenticate);

router.get('/stats', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);

    const [
      checkInsToday, checkInsTomorrow, checkOutsToday,
      pendingPreCheckins, pendingPostCheckouts,
      openActions, overdueActions,
      pendingApprovals, openTickets, damageReports,
    ] = await Promise.all([
      prisma.booking.count({ where: { checkIn: { gte: today, lt: tomorrow }, status: 'confirmed' } }),
      prisma.booking.count({ where: { checkIn: { gte: tomorrow, lt: dayAfter }, status: 'confirmed' } }),
      prisma.booking.count({ where: { checkOut: { gte: today, lt: tomorrow } } }),
      prisma.preCheckIn.count({ where: { status: 'pending' } }),
      prisma.postCheckOut.count({ where: { status: 'pending' } }),
      prisma.actionItem.count({ where: { status: { not: 'completed' } } }),
      prisma.actionItem.count({ where: { status: 'overdue' } }),
      prisma.approval.count({ where: { status: 'in_progress' } }),
      prisma.workTicket.count({ where: { status: { notIn: ['completed', 'cancelled'] } } }),
      prisma.postCheckOut.count({ where: { damageReported: true } }),
    ]);

    res.json({
      checkInsToday, checkInsTomorrow, checkOutsToday,
      pendingPreCheckins, pendingPostCheckouts,
      openActions, overdueActions, pendingApprovals,
      openTickets, damageReports,
    });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
