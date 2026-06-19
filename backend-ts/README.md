# Teddy's House Backend (Node.js + TypeScript)

Mock backend em Node.js e TypeScript para o projeto Teddy's House.

## Estrutura

- `src/server.ts` - servidor Express que expõe os endpoints do mock backend.
- `package.json` - scripts e dependências.
- `tsconfig.json` - configuração do TypeScript.

## Endpoints Disponíveis

- `GET /health` - verifica se o backend está ativo.
- `POST /auth/login` - mock de login, retorna `access_token` e `user_id`.
- `GET /balance/:userId` - retorna o saldo do usuário.
- `POST /transfer` - realiza uma transferência de moedas.
- `GET /transactions/:userId` - lista transações do usuário.

## Como rodar

```bash
cd backend-ts
npm install
npm run dev
```

O servidor iniciará em `http://localhost:8000`.

## Testes de endpoint

### 1) Health check

```bash
curl http://localhost:8000/health
```

Resposta esperada:

```json
{"status":"ok"}
```

### 2) Login

```bash
curl -X POST http://localhost:8000/auth/login
```

Resposta exemplo:

```json
{"access_token":"mock-token","user_id":"user1"}
```

### 3) Saldo

```bash
curl http://localhost:8000/balance/user1
```

Resposta exemplo:

```json
{"user_id":"user1","balance":1250}
```

### 4) Transferência

```bash
curl -X POST http://localhost:8000/transfer \
  -H "Content-Type: application/json" \
  -d '{"user_id":"user1","amount":100,"machine_id":"Máquina 1"}'
```

Resposta exemplo:

```json
{"status":"ok","tx":{"id":"...","user_id":"user1","amount":100,"machine_id":"Máquina 1"},"balance":1150}
```

### 5) Histórico de transações

```bash
curl http://localhost:8000/transactions/user1
```

Resposta exemplo:

```json
[{"id":"...","user_id":"user1","amount":100,"machine_id":"Máquina 1"}]
```

## Observações

- O backend usa armazenamento em memória para prototipagem; reiniciar o servidor zera as transações.
- Para persistência real, adicione banco de dados e models.
