import { Router } from 'express';
import { addCredit } from '../controllers/userController';

const router = Router();

router.post('/users/credit', addCredit);

export default router;
