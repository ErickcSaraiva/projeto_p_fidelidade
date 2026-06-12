# Teddy's House - Backend (Mock)

Este diretório contém um backend FastAPI de protótipo para o projeto Teddy's House.

Dependências (sugestão):
- Python 3.10+
- virtualenv

Instalação rápida:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Rodando localmente:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Endpoints úteis (mock):
- `GET /health` - status
- `POST /auth/login` - mock login
- `GET /balance/{user_id}` - consultar saldo
- `POST /transfer` - transferir moedas para máquina
- `GET /transactions/{user_id}` - listar transações

## Checklist de Teste de Backend

- [ ] Validar instalação das dependências em `venv` e ativar o ambiente virtual.
- [ ] Iniciar o serviço com `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`.
- [ ] Confirmar `GET /health` retorna `{"status":"ok"}` com HTTP 200.
- [ ] Confirmar `POST /auth/login` retorna token ou payload mock esperado.
- [ ] Confirmar `GET /balance/{user_id}` retorna objeto de saldo válido e HTTP 200.
- [ ] Confirmar `POST /transfer` aceita payload válido e aplica alteração de saldo em memória.
- [ ] Confirmar `GET /transactions/{user_id}` retorna histórico de transações consistente.
- [ ] Verificar logs do backend para ausência de exceções e respostas 5xx.
- [ ] Validar tratamento de erros para payload inválido ou usuário inexistente.
- [ ] Documentar inconsistências de contrato de API ou payload.

OBS: Este backend é um esqueleto para desenvolvimento local. Substitua a store em memória por um banco PostgreSQL e adicione autenticação JWT antes de usar em produção.
