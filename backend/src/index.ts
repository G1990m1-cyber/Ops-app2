import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';

import authRouter from './routes/auth';
import propertiesRouter from './routes/properties';
import usersRouter from './routes/users';
import actionItemsRouter from './routes/actionItems';
import stocktakeRouter from './routes/stocktake';
import bookingsRouter from './routes/bookings';
import checkinsRouter from './routes/checkins';
import weeklyChecksRouter from './routes/weeklyChecks';
import monthlyChecksRouter from './routes/monthlyChecks';
import approvalsRouter from './routes/approvals';
import workTicketsRouter from './routes/workTickets';
import dashboardRouter from './routes/dashboard';
import hostawayRouter from './routes/hostawayWebhook';

export const prisma = new PrismaClient();

const app = express();
app.use(helmet());
app.use(cors());

// Capture raw body for Hostaway webhook signature verification
app.use(express.json({
  verify: (req: any, _res, buf) => { req.rawBody = buf; },
}));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/properties', propertiesRouter);
app.use('/api/users', usersRouter);
app.use('/api/action-items', actionItemsRouter);
app.use('/api/stocktake', stocktakeRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/checkins', checkinsRouter);
app.use('/api/weekly-checks', weeklyChecksRouter);
app.use('/api/monthly-checks', monthlyChecksRouter);
app.use('/api/approvals', approvalsRouter);
app.use('/api/work-tickets', workTicketsRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/hostaway', hostawayRouter);

app.get('/api/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Ops App API running on port ${PORT}`));
