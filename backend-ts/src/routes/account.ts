import { Router } from 'express';
import { getBalance, getTransactions, login, transfer } from '../controllers/accountController';

const router = Router();

router.post('/auth/login', login);
router.get('/balance/:userId', getBalance);
router.post('/transfer', transfer);
router.get('/transactions/:userId', getTransactions);

export default router;
