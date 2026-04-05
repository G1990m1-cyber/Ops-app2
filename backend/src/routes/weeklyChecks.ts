import { Router } from 'express';
import { prisma } from '../index';
import { authenticate } from './auth';

const router = Router();
router.use(authenticate);

router.get('/', async (req, res) => {
  try {
    const { propertyId, status } = req.query;
    const where: any = {};
    if (propertyId) where.propertyId = propertyId;
    if (status) where.status = status;
    const checks = await prisma.weeklyCheck.findMany({
      where,
      include: { property: true, checklist: true },
      orderBy: { weekStart: 'desc' },
    });
    res.json(checks);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const check = await prisma.weeklyCheck.findUnique({
      where: { id: req.params.id },
      include: { property: true, checklist: true },
    });
    if (!check) return res.status(404).json({ error: 'Not found' });
    res.json(check);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/:id', async (req: any, res) => {
  try {
    const { checklist, notes, issuesFound, status } = req.body;
    const data: any = { notes, issuesFound, status };
    if (status === 'completed') {
      data.completedAt = new Date();
      data.completedBy = req.user?.userId;
    }
    if (checklist) {
      await prisma.weeklyCheckItem.deleteMany({ where: { weeklyCheckId: req.params.id } });
      data.checklist = {
        create: checklist.map((c: any) => ({ label: c.label, checked: c.checked, notes: c.notes })),
      };
    }
    const check = await prisma.weeklyCheck.update({
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
