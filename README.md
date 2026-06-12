# Projeto Teddy's House

Monorepo inicial para o projeto de fidelidade "Teddy's House".

Estrutura proposta:

- `app-mobile/` - Flutter app (mobile)
- `backend/` - FastAPI backend
- `firmware/` - ESP32 code and JSON validation design
- `design-assets/` - assets e imagens do design system
- `docs/` - diagramas e documentação

O backend mock já foi criado em `backend/app/main.py` com endpoints básicos para desenvolvimento.

Próximos passos sugeridos:
- Rodar o backend localmente (veja `backend/README.md`).
- Criar o scaffold do app Flutter com `flutter create app-mobile` ou, se preferir, eu gero os arquivos iniciais aqui.
- Planejar e implementar a persistência (PostgreSQL + Alembic) e autenticação JWT.

Se quiser, posso agora:
- Gerar o scaffold do app Flutter e configurar `pubspec.yaml` para assets,
- Ou implementar a conexão do backend com PostgreSQL (models + alembic),
- Ou criar o diagrama de sequência do JSON de validação para o ESP32.

Diga qual opção prefere que eu execute em seguida.
