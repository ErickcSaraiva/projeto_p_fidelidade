import { Router } from 'express';
import { rewardGame, startGame } from '../controllers/gameController';

const router = Router();

router.post('/start', startGame);
router.post('/reward', rewardGame);

export default router;
