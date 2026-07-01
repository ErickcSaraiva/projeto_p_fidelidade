import type { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const processCreditPurchase = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;
  const cashbackRate = 0.10; // 10%

  if (!userId || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'userId and a positive numeric amount are required.'
    });
  }

  try {
    // A chave aqui é que o TypeScript vai inferir o tipo de 'tx' automaticamente
    // ao utilizarmos o prisma.$transaction e retornarmos os dados.
    const updatedUser = await prisma.$transaction(async (tx) => {
      
      // 1. Atualiza o saldo e cashback
      const user = await tx.user.update({
        where: { id: userId },
        data: {
          balance: { increment: amount },
          cashback: { increment: amount * cashbackRate }
        }
      });

      // 2. Regista a transação
      await tx.transaction.create({
        data: {
          userId,
          amount,
          type: 'CREDIT_PURCHASE'
        }
      });

      return user;
    });

    return res.status(200).json({ 
      success: true, 
      newBalance: updatedUser.balance,
      newCashback: updatedUser.cashback 
    });

  } catch (error) {
    console.error("Erro na transação:", error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erro na transação financeira. Verifique o ID do utilizador.' 
    });
  }
};
