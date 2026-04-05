import { Router } from 'express';
import { prisma } from '../index';
import { authenticate } from './auth';

const router = Router();
router.use(authenticate);

router.get('/', async (req, res) => {
  try {
    const { propertyId, status, year } = req.query;
    const where: any = {};
    if (propertyId) where.propertyId = propertyId;
    if (status) where.status = status;
    if (year) where.year = parseInt(year as string);
    const checks = await prisma.monthlyCheck.findMany({
      where,
      include: { property: true, checklist: true },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });
    res.json(checks);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/:id', async (req: any, res) => {
  try {
    const { checklist, notes, status, electricReading, gasReading, waterReading } = req.body;
    const data: any = { notes, status, electricReading, gasReading, waterReading };
    if (status === 'completed') {
      data.completedAt = new Date();
      data.completedBy = req.user?.userId;
    }
    if (checklist) {
      await prisma.monthlyCheckItem.deleteMany({ where: { monthlyCheckId: req.params.id } });
      data.checklist = {
        create: checklist.map((c: any) => ({ label: c.label, checked: c.checked })),
      };
    }
    const check = await prisma.monthlyCheck.update({
      where: { id: req.params.id },
      data,
      include: { checklist: true },
    });
    res.json(check);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
