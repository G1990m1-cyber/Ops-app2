import { Router } from 'express';
import { prisma } from '../index';
import { authenticate } from './auth';

const router = Router();
router.use(authenticate);

router.get('/', async (req, res) => {
  try {
    const { propertyId, status, assignedTo } = req.query;
    const where: any = {};
    if (propertyId) where.propertyId = propertyId;
    if (status) where.status = status;
    if (assignedTo) where.assignedToId = assignedTo;
    const tickets = await prisma.workTicket.findMany({
      where,
      include: { property: true, assignedTo: { select: { id: true, name: true } } },
      orderBy: [{ status: 'asc' }, { dueDate: 'asc' }],
    });
    res.json(tickets);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const ticket = await prisma.workTicket.findUnique({
      where: { id: req.params.id },
      include: { property: true, assignedTo: { select: { id: true, name: true } } },
    });
    if (!ticket) return res.status(404).json({ error: 'Not found' });
    res.json(ticket);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data: any = { ...req.body };
    if (data.dueDate) data.dueDate = new Date(data.dueDate);
    if (data.assignedTo) { data.assignedToId = data.assignedTo; delete data.assignedTo; }
    delete data.id;
    const ticket = await prisma.workTicket.create({ data });
    res.status(201).json(ticket);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const data: any = { ...req.body, updatedAt: new Date() };
    if (data.dueDate) data.dueDate = new Date(data.dueDate);
    if (data.completedAt) data.completedAt = new Date(data.completedAt);
    if (data.assignedTo) { data.assignedToId = data.assignedTo; delete data.assignedTo; }
    delete data.id;
    const ticket = await prisma.workTicket.update({ where: { id: req.params.id }, data });
    res.json(ticket);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
