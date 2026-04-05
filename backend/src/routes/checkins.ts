import { Router } from 'express';
import { prisma } from '../index';
import { authenticate } from './auth';

const router = Router();
router.use(authenticate);

// Pre check-ins
router.get('/pre', async (req, res) => {
  try {
    const { propertyId, status } = req.query;
    const where: any = {};
    if (propertyId) where.propertyId = propertyId;
    if (status) where.status = status;
    const items = await prisma.preCheckIn.findMany({
      where,
      include: { booking: true, property: true, checklist: true },
      orderBy: { scheduledDate: 'asc' },
    });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/pre/:id', async (req, res) => {
  try {
    const item = await prisma.preCheckIn.findUnique({
      where: { id: req.params.id },
      include: { booking: true, property: true, checklist: true },
    });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/pre/:id', async (req: any, res) => {
  try {
    const { checklist, notes, damageReported, damageNotes, status } = req.body;
    const now = new Date();
    const data: any = { notes, damageReported, damageNotes, status };
    if (status === 'completed') {
      data.completedAt = now;
      data.completedBy = req.user?.userId;
    }
    if (checklist) {
      await prisma.preCheckInItem.deleteMany({ where: { preCheckInId: req.params.id } });
      data.checklist = {
        create: checklist.map((c: any) => ({ label: c.label, checked: c.checked, notes: c.notes })),
      };
    }
    const item = await prisma.preCheckIn.update({
      where: { id: req.params.id },
      data,
      include: { checklist: true },
    });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Post check-outs
router.get('/post', async (req, res) => {
  try {
    const { propertyId, status } = req.query;
    const where: any = {};
    if (propertyId) where.propertyId = propertyId;
    if (status) where.status = status;
    const items = await prisma.postCheckOut.findMany({
      where,
      include: { booking: true, property: true, checklist: true },
      orderBy: { scheduledDate: 'asc' },
    });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/post/:id', async (req: any, res) => {
  try {
    const { checklist, notes, damageReported, damageNotes, cleaningRequired, status } = req.body;
    const now = new Date();
    const data: any = { notes, damageReported, damageNotes, cleaningRequired, status };
    if (status === 'completed') {
      data.completedAt = now;
      data.completedBy = req.user?.userId;
    }
    if (checklist) {
      await prisma.postCheckOutItem.deleteMany({ where: { postCheckOutId: req.params.id } });
      data.checklist = {
        create: checklist.map((c: any) => ({ label: c.label, checked: c.checked, notes: c.notes })),
      };
    }
    const item = await prisma.postCheckOut.update({
      where: { id: req.params.id },
      data,
      include: { checklist: true },
    });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
