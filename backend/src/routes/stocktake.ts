import { Router } from 'express';
import { prisma } from '../index';
import { authenticate } from './auth';

const router = Router();
router.use(authenticate);

router.get('/items', async (_req, res) => {
  try {
    const items = await prisma.stocktakeItem.findMany({ orderBy: { name: 'asc' } });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/entries', async (req, res) => {
  try {
    const { propertyId } = req.query;
    const where: any = {};
    if (propertyId) where.propertyId = propertyId;
    const entries = await prisma.stocktakeEntry.findMany({
      where,
      include: { items: { include: { item: true } }, property: true },
      orderBy: { date: 'desc' },
    });
    res.json(entries);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/entries', async (req: any, res) => {
  try {
    const { propertyId, items, notes } = req.body;
    const entry = await prisma.stocktakeEntry.create({
      data: {
        propertyId,
        submittedBy: req.user?.userId ?? '',
        status: 'submitted',
        notes,
        items: {
          create: items.map((i: { itemId: string; quantity: number }) => ({
            itemId: i.itemId,
            quantity: i.quantity,
          })),
        },
      },
      include: { items: true },
    });
    res.status(201).json(entry);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
