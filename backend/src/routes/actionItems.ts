import { Router } from 'express';
import { prisma } from '../index';
import { authenticate } from './auth';

const router = Router();
router.use(authenticate);

router.get('/', async (req, res) => {
  const { propertyId, status } = req.query as any;
  const where: any = {};
  if (propertyId) where.propertyId = propertyId;
  if (status) where.status = status;
  const items = await prisma.actionItem.findMany({
    where, include: { history: true }, orderBy: { dueDate: 'asc' },
  });
  res.json(items);
});

router.post('/', async (req, res) => {
  const { history, ...data } = req.body;
  const item = await prisma.actionItem.create({
    data: { ...data, dueDate: new Date(data.dueDate), history: { create: history ?? [] } },
    include: { history: true },
  });
  res.status(201).json(item);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { history, ...data } = req.body;
  const item = await prisma.actionItem.update({
    where: { id }, data: { ...data, dueDate: new Date(data.dueDate) },
    include: { history: true },
  });
  res.json(item);
});

router.post('/:id/history', async (req, res) => {
  const entry = await prisma.actionItemHistory.create({
    data: { ...req.body, actionItemId: req.params.id },
  });
  res.status(201).json(entry);
});

export default router;
