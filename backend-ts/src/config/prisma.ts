import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("⚠️ ERRO CRÍTICO: Variável DATABASE_URL não encontrada no ficheiro .env");
}

// Recria exatamente a conexão de alta performance que funcionou no teu teste
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };