import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { prisma } from './config/prisma';

const app = express();

// Middlewares obrigatórios
app.use(cors());
app.use(express.json());

// Rota de teste inicial para garantir que a API responde
app.get('/', async (req, res) => {
  try {
    // Faz um teste rápido na BD ao contar os utilizadores
    const userCount = await prisma.user.count();
    res.json({
      status: "online",
      mensagem: "Backend da Catchup Platform a funcionar a 100%!",
      utilizadores_registados: userCount
    });
  } catch (error) {
    res.status(500).json({ status: "erro", detalhe: "Erro ao ligar à base de dados" });
  }
});

// Define a porta do servidor (usa a do .env ou a 8000 por padrão)
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor TypeScript rodando em http://localhost:${PORT}`);
});
// ==========================================
// ROTA DE LIVE-OPS (CONTROLO DE TEMA)
// ==========================================

app.get('/settings/current-theme', async (req, res) => {
  try {
    // 1. Procura a configuração global na base de dados
    let config = await prisma.setting.findUnique({
      where: { id: 'GLOBAL' }
    });

    // 2. TRUQUE DE ARQUITETO: Se a tabela acabou de ser criada e está vazia, 
    // o próprio servidor injeta o tema "default" automaticamente para não dar erro!
    if (!config) {
      config = await prisma.setting.create({
        data: {
          id: 'GLOBAL',
          activeTheme: 'default',
          particles: 'none'
        }
      });
    }

    return res.json({
      success: true,
      theme: config.activeTheme,
      particles: config.particles,
      lastUpdated: config.updatedAt
    });

  } catch (error) {
    console.error('Erro ao buscar o tema atual:', error);
    return res.status(500).json({ error: 'Erro interno a carregar configurações visuais' });
  }
});