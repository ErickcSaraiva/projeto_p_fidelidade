# Projeto Teddy's House

Monorepo inicial para o projeto de fidelidade "Teddy's House".

## Estrutura do Repositório

- `app-mobile/` - Flutter app existente com scaffold e telas principais.
- `backend/` - FastAPI backend existente.
- `backend-ts/` - Novo backend em Node.js + TypeScript.
- `mobile-ts/` - Novo app móvel em React Native + TypeScript (Expo).
- `firmware/` - Código ESP32 e design de validação JSON.
- `design-assets/` - Assets e imagens do design system.
- `docs/` - Diagramas e documentação.

> Veja também `backend-ts/README.md` e `mobile-ts/README.md` para instruções detalhadas de execução.

## Estado Atual

### `backend-ts`

O mock backend em TypeScript está implementado com Express e serve endpoints compatíveis com o backend original em FastAPI.

- `backend-ts/src/server.ts`
- `backend-ts/package.json`
- `backend-ts/tsconfig.json`
- `backend-ts/README.md`

Endpoints disponíveis:

- `GET /health`
- `POST /auth/login`
- `GET /balance/:userId`
- `POST /transfer`
- `GET /transactions/:userId`

### `mobile-ts`

O app em React Native + TypeScript utiliza Expo e navegação por abas:

- `mobile-ts/App.tsx`
- `mobile-ts/src/screens/Inicio.tsx`
- `mobile-ts/src/screens/Balance.tsx`
- `mobile-ts/src/screens/Transfer.tsx`
- `mobile-ts/src/services/api.ts`

Abas disponíveis:

- `início`
- `saldo`
- `transferência`

O app consome o `backend-ts` através do cliente HTTP em `mobile-ts/src/services/api.ts`.

### `app-mobile`

O app Flutter existente ainda está presente como referência e pode ser usado em paralelo ao stack TypeScript.

## Como executar

### Iniciar o backend TypeScript

```bash
cd backend-ts
npm install
npm run dev
```

O servidor ouvirá em `http://localhost:8000`.

### Iniciar o app móvel TypeScript

```bash
cd mobile-ts
npm install
npx expo start
```

Abra no dispositivo/emulador usando Expo.

### Usar o app Flutter existente

```bash
cd app-mobile
flutter pub get
flutter run
```

Ajuste `app-mobile/lib/config.dart` para o backend local:

- Android emulator: `http://10.0.2.2:8000`
- iOS simulator: `http://127.0.0.1:8000`
- Dispositivo físico: `http://<SEU_IP_LOCAL>:8000`

## Testes de endpoints

### Testar saúde do backend

```bash
curl http://localhost:8000/health
```

Resposta esperada:

```json
{"status":"ok"}
```

### Testar login

```bash
curl -X POST http://localhost:8000/auth/login
```

Resposta exemplo:

```json
{"access_token":"mock-token","user_id":"user1"}
```

### Testar saldo

```bash
curl http://localhost:8000/balance/user1
```

Resposta exemplo:

```json
{"user_id":"user1","balance":1250}
```

### Testar transferência

```bash
curl -X POST http://localhost:8000/transfer \
  -H "Content-Type: application/json" \
  -d '{"user_id":"user1","amount":100,"machine_id":"Máquina 1"}'
```

Resposta exemplo:

```json
{"status":"ok","tx":{"id":"...","user_id":"user1","amount":100,"machine_id":"Máquina 1"},"balance":1150}
```

### Testar histórico

```bash
curl http://localhost:8000/transactions/user1
```

Resposta exemplo:

```json
[{"id":"...","user_id":"user1","amount":100,"machine_id":"Máquina 1"}]
```

## Dicas de desenvolvimento

- Se estiver usando o backend TypeScript, mantenha o `backend-ts` e o `mobile-ts` abertos para testes.
- Para rodar o app Flutter com backend local, ajuste `API_BASE` em `app-mobile/lib/config.dart` ou use `--dart-define`.
- Para o app Expo, ajuste `mobile-ts/src/services/api.ts` ou defina `API_BASE` via ambiente.

## Próximos passos sugeridos

- Migrar assets, fontes e imagens para `mobile-ts`.
- Configurar persistência com banco de dados para `backend-ts`.
- Adicionar autenticação JWT e armazenamento seguro.
- Implementar testes automáticos para backend e app.
- Configurar CI/CD para builds e deploy.
