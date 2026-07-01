import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import accountRoutes from './routes/account';
import creditRoutes from './routes/credit';
import gameRoutes from './routes/game';

const app = express();
const port = Number(process.env.PORT ?? 8000);

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  return res.json({ status: 'ok' });
});

app.use(accountRoutes);
app.use(creditRoutes);
app.use('/games', gameRoutes);

app.use((_req, res) => {
  return res.status(404).json({ error: 'Route not found.' });
});

const server = app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});

server.on('error', (error) => {
  console.error('Failed to start backend server:', error);
  process.exit(1);
});
