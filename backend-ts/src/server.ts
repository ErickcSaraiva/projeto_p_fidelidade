import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors());
app.use(express.json());

type User = { id: string; balance: number };

const USERS: Record<string, User> = { user1: { id: 'user1', balance: 1250 } };
const TRANSACTIONS: Array<Record<string, any>> = [];

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/auth/login', (_req, res) => {
  res.json({ access_token: 'mock-token', user_id: 'user1' });
});

app.get('/balance/:userId', (req, res) => {
  const user = USERS[req.params.userId];
  if (!user) return res.status(404).json({ detail: 'User not found' });
  return res.json({ user_id: user.id, balance: user.balance });
});

app.post('/transfer', (req, res) => {
  const { user_id, amount, machine_id } = req.body;
  const user = USERS[user_id];
  if (!user) return res.status(404).json({ detail: 'User not found' });
  if (!amount || amount <= 0) return res.status(400).json({ detail: 'Invalid amount' });
  if (amount > user.balance) return res.status(400).json({ detail: 'Insufficient balance' });
  user.balance -= amount;
  const tx = { id: uuidv4(), user_id, amount, machine_id };
  TRANSACTIONS.push(tx);
  return res.json({ status: 'ok', tx, balance: user.balance });
});

app.get('/transactions/:userId', (req, res) => {
  const list = TRANSACTIONS.filter((t) => t.user_id === req.params.userId);
  return res.json(list);
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
app.listen(PORT, () => console.log(`Backend (TS) running on http://localhost:${PORT}`));
