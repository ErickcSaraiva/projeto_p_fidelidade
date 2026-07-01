import type { Request, Response } from 'express';
import crypto from 'crypto';
import { prisma } from '../config/prisma';

const GAME_CONFIG: Record<string, { maxDurationSeconds: number; maxCoinsPerSecond: number }> = {
  'coin-collector': { maxDurationSeconds: 30, maxCoinsPerSecond: 3 },
  'quick-tap': { maxDurationSeconds: 60, maxCoinsPerSecond: 2 },
  puzzle: { maxDurationSeconds: 120, maxCoinsPerSecond: 1 },
};

function generateGameHash(userId: string, gameId: string, startedAt: number): string {
  const secret = process.env.GAME_SECRET ?? 'fallback_secret';
  const payload = `${userId}:${gameId}:${startedAt}:${secret}`;

  return crypto.createHash('sha256').update(payload).digest('hex');
}

export const startGame = async (req: Request, res: Response) => {
  const { userId, gameId } = req.body;

  if (!userId || !gameId) {
    return res.status(400).json({ success: false, error: 'userId and gameId are required.' });
  }

  const config = GAME_CONFIG[gameId];
  if (!config) {
    return res.status(400).json({ success: false, error: `Mini-game '${gameId}' is not recognized.` });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found.' });
  }

  const startedAt = Date.now();
  const sessionToken = generateGameHash(userId, gameId, startedAt);

  return res.json({
    success: true,
    sessionToken,
    startedAt,
    gameConfig: config,
    message: 'Game session started.',
  });
};

export const rewardGame = async (req: Request, res: Response) => {
  const { userId, gameId, earnedCoins, sessionToken, startedAt } = req.body;

  if (!userId || !gameId || !sessionToken || !startedAt || typeof earnedCoins !== 'number') {
    return res.status(400).json({ success: false, error: 'Incomplete payload.' });
  }

  const config = GAME_CONFIG[gameId];
  if (!config) {
    return res.status(400).json({ success: false, error: 'Invalid mini-game.' });
  }

  const expectedToken = generateGameHash(userId, gameId, startedAt);
  if (sessionToken !== expectedToken) {
    console.warn(`Invalid game token: userId=${userId} gameId=${gameId}`);
    return res.status(403).json({ success: false, error: 'Invalid session token.' });
  }

  const elapsedSeconds = (Date.now() - startedAt) / 1000;
  if (elapsedSeconds < 3) {
    return res.status(400).json({ success: false, error: 'Game session is too short to be valid.' });
  }

  if (elapsedSeconds > config.maxDurationSeconds * 2) {
    return res.status(400).json({ success: false, error: 'Game session expired.' });
  }

  const maxPossibleCoins = Math.ceil(elapsedSeconds * config.maxCoinsPerSecond);
  if (earnedCoins > maxPossibleCoins) {
    console.warn(`Impossible game reward: userId=${userId} requested=${earnedCoins} max=${maxPossibleCoins}`);
    return res.status(400).json({
      success: false,
      error: `Impossible result. Maximum allowed reward: ${maxPossibleCoins} coins.`,
    });
  }

  if (earnedCoins < 0) {
    return res.status(400).json({ success: false, error: 'earnedCoins cannot be negative.' });
  }

  try {
    const updatedUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { id: userId },
        data: { balance: { increment: earnedCoins } },
      });

      await tx.transaction.create({
        data: {
          userId,
          amount: earnedCoins,
          type: `GAME_REWARD:${gameId}`,
        },
      });

      await tx.gameSession.create({
        data: {
          userId,
          coinsEarned: earnedCoins,
        },
      });

      return user;
    });

    return res.json({
      success: true,
      message: `Reward granted for ${gameId}.`,
      earnedCoins,
      newBalance: Number(updatedUser.balance.toFixed(2)),
      elapsedSeconds: Math.round(elapsedSeconds),
    });
  } catch (error) {
    console.error('Error processing game reward:', error);
    return res.status(500).json({ success: false, error: 'Internal error while registering reward.' });
  }
};
