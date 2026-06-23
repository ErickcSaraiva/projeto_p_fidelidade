import 'dotenv/config'; // Importante carregar as variáveis de ambiente primeiro
import { prisma } from './config/prisma'; // Importa a conexão única

async function main() {
  console.log("🌱 A ligar ao PostgreSQL...");

  // Exemplo de uso: buscar ou criar um utilizador
  const user = await prisma.user.upsert({
    where: { email: 'erick@catchup.com' },
    update: {},
    create: {
      username: 'erick_crane_master',
      email: 'erick@catchup.com',
      balance: 150,
    },
  });

  console.log("🎉 CLIENTE PRONTO:", user);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());