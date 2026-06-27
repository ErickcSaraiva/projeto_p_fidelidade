import { Request, Response } from 'express';
import crypto from 'crypto';
import { prisma } from './config/prisma';

// ==========================================
// CONFIGURAÇÃO DOS MINI-JOGOS
// ==========================================

const GAME_CONFIG: Record<string, { maxDurationSeconds: number; maxCoinsPerSecond: number }> = {
  'coin-collector': { maxDurationSeconds: 30,  maxCoinsPerSecond: 3 },
  'quick-tap':      { maxDurationSeconds: 60,  maxCoinsPerSecond: 2 },
  'puzzle':         { maxDurationSeconds: 120, maxCoinsPerSecond: 1 },
};

function generateGameHash(userId: string, gameId: string, startedAt: number): string {
  const secret = process.env.GAME_SECRET ?? 'fallback_secret';
  const payload = `${userId}:${gameId}:${startedAt}:${secret}`;
  return crypto.createHash('sha256').update(payload).digest('hex');
}

// ==========================================
// INICIAR PARTIDA
// ==========================================

export const startGame = async (req: Request, res: Response) => {
  const { userId, gameId } = req.body;

  if (!userId || !gameId) {
    return res.status(400).json({ success: false, error: 'userId e gameId são obrigatórios.' });
  }

  const config = GAME_CONFIG[gameId];
  if (!config) {
    return res.status(400).json({ success: false, error: `Mini-jogo '${gameId}' não reconhecido.` });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({ success: false, error: 'Utilizador não encontrado.' });
  }

  const startedAt = Date.now();
  const sessionToken = generateGameHash(userId, gameId, startedAt);

  return res.json({
    success: true,
    sessionToken,
    startedAt,
    gameConfig: config,
    message: 'Partida iniciada. Guarda o sessionToken para submeter o resultado!'
  });
};

// ==========================================
// SUBMETER RESULTADO E RECEBER RECOMPENSA
// ==========================================

export const rewardGame = async (req: Request, res: Response) => {
  const { userId, gameId, earnedCoins, sessionToken, startedAt } = req.body;

  if (!userId || !gameId || !sessionToken || !startedAt || typeof earnedCoins !== 'number') {
    return res.status(400).json({ success: false, error: 'Payload incompleto.' });
  }

  const config = GAME_CONFIG[gameId];
  if (!config) {
    return res.status(400).json({ success: false, error: 'Mini-jogo inválido.' });
  }

  // ANTI-CHEAT 1: Validar hash criptográfico
  const expectedToken = generateGameHash(userId, gameId, startedAt);
  if (sessionToken !== expectedToken) {
    console.warn(`🚨 TENTATIVA DE CHEAT DETETADA: userId=${userId} gameId=${gameId}`);
    return res.status(403).json({ success: false, error: 'Token de sessão inválido.' });
  }

  // ANTI-CHEAT 2: Validar tempo de jogo plausível
  const elapsedSeconds = (Date.now() - startedAt) / 1000;

  if (elapsedSeconds < 3) {
    return res.status(400).json({ success: false, error: 'Partida demasiado curta para ser válida.' });
  }

  if (elapsedSeconds > config.maxDurationSeconds * 2) {
    return res.status(400).json({ success: false, error: 'Sessão de jogo expirada.' });
  }

  // ANTI-CHEAT 3: Validar se as moedas são fisicamente possíveis
  const maxPossibleCoins = Math.ceil(elapsedSeconds * config.maxCoinsPerSecond);
  if (earnedCoins > maxPossibleCoins) {
    console.warn(`🚨 COINS IMPOSSÍVEIS: userId=${userId} pediu ${earnedCoins}, máximo=${maxPossibleCoins}`);
    return res.status(400).json({
      success: false,
      error: `Resultado impossível. Máximo alcançável: ${maxPossibleCoins} moedas.`
    });
  }

  if (earnedCoins < 0) {
    return res.status(400).json({ success: false, error: 'earnedCoins não pode ser negativo.' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { balance: { increment: earnedCoins } }
    });

    await prisma.transaction.create({
      data: {
        userId,
        amount: earnedCoins,
        type: `GAME_REWARD:${gameId}`
      }
    });

    console.log(`✅ Recompensa válida: userId=${userId} gameId=${gameId} coins=${earnedCoins}`);

    return res.json({
      success: true,
      message: `Parabéns! Ganhaste ${earnedCoins} moedas no ${gameId}!`,
      earnedCoins,
      newBalance: Number(updatedUser.balance.toFixed(2)),
      elapsedSeconds: Math.round(elapsedSeconds)
    });
  } catch (error) {
    console.error('Erro ao processar recompensa:', error);
    return res.status(500).json({ success: false, error: 'Erro interno ao registar recompensa.' });
  }
};