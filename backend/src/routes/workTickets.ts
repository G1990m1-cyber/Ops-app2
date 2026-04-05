import { Router } from 'express';
import { prisma } from '../index';
import { authenticate } from './auth';

const router = Router();
router.use(authenticate);

router.get('/', async (req, res) => {
  const { propertyId, assignedTo, status } = req.query as any;
  const where: any = {};
  if (propertyId) where.propertyId = propertyId;
  if (assignedTo) where.assignedTo = assignedTo;
  if (status) where.status = status;
  const tickets = await prisma.workTicket.findMany({ where, orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }] });
  res.json(tickets);
});

router.post('/', async (req, res) => {
  const ticket = await prisma.workTicket.create({
    data: { ...req.body, dueDate: req.body.dueDate ? new Date(req.body.dueDate) : undefined },
  });
  res.status(201).json(ticket);
});

router.put('/:id', async (req, res) => {
  const ticket = await prisma.workTicket.update({
    where: { id: req.params.id },
    data: { ...req.body, dueDate: req.body.dueDate ? new Date(req.body.dueDate) : undefined, updatedAt: new Date() },
  });
  res.json(ticket);
});

export default router;
