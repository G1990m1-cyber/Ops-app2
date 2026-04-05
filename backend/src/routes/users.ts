import { Router } from 'express';
import { prisma } from '../index';
import { authenticate } from './auth';

const router = Router();
router.use(authenticate);

router.get('/', async (req, res) => {
  try {
    // TODO: implement users list
    res.json([]);
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
