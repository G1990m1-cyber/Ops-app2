import { Router } from 'express';
import { prisma } from '../index';
import { authenticate } from './auth';

const router = Router();
router.use(authenticate);

router.get('/', async (req: any, res) => {
  const props = await prisma.property.findMany({ orderBy: { name: 'asc' } });
  res.json(props);
});

router.post('/', async (req, res) => {
  const prop = await prisma.property.create({ data: req.body });
  res.status(201).json(prop);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const prop = await prisma.property.update({ where: { id }, data: req.body });
  res.json(prop);
});

export default router;
