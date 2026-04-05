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
  const items = await prisma.approval.findMany({
    where, include: { history: true, submitter: { select: { id: true, name: true } } },
    orderBy: { submittedAt: 'desc' },
  });
  res.json(items);
});

router.post('/', async (req, res) => {
  const { history, ...data } = req.body;
  const item = await prisma.approval.create({
    data: { ...data, history: { create: history ?? [] } },
    include: { history: true },
  });
  res.status(201).json(item);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { history, ...data } = req.body;
  const item = await prisma.approval.update({ where: { id }, data, include: { history: true } });
  res.json(item);
});

router.post('/:id/action', async (req: any, res) => {
  const { action, notes } = req.body;
  const approval = await prisma.approval.update({
    where: { id: req.params.id },
    data: {
      status: action,
      reviewedBy: req.user.userId,
      reviewedAt: new Date(),
      history: { create: { action, by: req.user.userId, notes } },
    },
    include: { history: true },
  });
  res.json(approval);
});

export default router;
