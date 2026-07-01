# Teddy's House - Flutter App (scaffold)

Este diretório contém um scaffold inicial do aplicativo Flutter.

Como usar:

```bash
# no diretório app-mobile
flutter pub get
flutter run
```

Observações:
- Copie suas imagens para `assets/images/`.
- Adicione fontes em `assets/fonts/` e atualize `pubspec.yaml` se necessário.
- Este é um scaffold inicial com telas placeholder: `Home`, `Games`, `Balance`, `Profile`.
- Para integrar com o backend, use `dio` e a URL `http://localhost:8000` durante desenvolvimento.

Configurar `API_BASE`
---------------------

Por padrão o app usa `lib/config.dart` com `API_BASE = 'http://10.0.2.2:8000'` (Android emulator).

- Para rodar em um emulador Android mantenha `10.0.2.2:8000`.
- Para iOS simulator use `http://127.0.0.1:8000`.
- Para um dispositivo físico, atualize `lib/config.dart` com o IP da sua máquina, por exemplo `http://192.168.1.100:8000`.

Você também pode sobrescrever a base durante `flutter run` usando `--dart-define`:

```bash
flutter run --dart-define=API_BASE=http://192.168.1.100:8000
```

Ou passe o `baseUrl` direto ao criar `ApiService` no código (útil para testes).

## Checklist de Teste Manual

### 1) Preparação do ambiente
- [ ] Verificar o diretório correto do backend e do app.
- [ ] Ativar o virtualenv do backend e iniciar `uvicorn`.
- [ ] Confirmar `flutter pub get` em `app-mobile`.
- [ ] Validar dispositivo/emulador com `flutter devices`.
- [ ] Confirmar URL do backend em `lib/config.dart` ou com `--dart-define`.

### 2) Teste rápido do backend
- [ ] Acessar `http://127.0.0.1:8000/health` e ver `{"status":"ok"}`.
- [ ] Acessar `http://127.0.0.1:8000/balance/user1` e verificar saldo retornado.
- [ ] Fazer POST em `/transfer` com payload válido e verificar resposta de sucesso.

### 3) Tela Home
- [ ] Verificar o cabeçalho `TEDDY'S HOUSE`.
- [ ] Conferir o cartão de boas-vindas e descrição.
- [ ] Confirmar a lista de `Jogos Diários` visível.
- [ ] Testar interação visual dos cards.

### 4) Tela Games
- [ ] Navegar para a aba `Games`.
- [ ] Confirmar o título `Arenas`.
- [ ] Verificar cards de arena com título e descrição.
- [ ] Testar rolagem e visualização dos cards.

### 5) Tela Balance
- [ ] Navegar para a aba `Balance`.
- [ ] Confirmar exibição de `CASHBACK/SALDO`.
- [ ] Verificar o saldo atual exibido.
- [ ] Selecionar valores 50/100/200 e conferir seleção visual.
- [ ] Testar o botão `Ativar Transferência`.
- [ ] Testar o botão `Abrir Transferência`.

### 6) Tela Transfer
- [ ] Confirmar título `Transferir Moedas`.
- [ ] Verificar animação NFC/QR simulada.
- [ ] Selecionar diferentes máquinas.
- [ ] Escolher 50/100/200 moedas.
- [ ] Tocar em `ATIVAR TRANSFERÊNCIA` e confirmar diálogo de sucesso.
- [ ] Verificar atualização de saldo após transferência.

### 7) Tela Profile
- [ ] Navegar para a aba `Profile`.
- [ ] Confirmar avatar, nome e nível do usuário.
- [ ] Verificar cartão de meta de recompensas com barra de progresso.
- [ ] Validar legibilidade de textos e elementos.

### 8) Testes de usabilidade
- [ ] Girar o dispositivo em retrato/paisagem.
- [ ] Validar responsividade e ausência de overflow.
- [ ] Testar rolagem de listas e desempenho.

### 9) Acessibilidade
- [ ] Navegar por teclado/DPAD (Tab/Shift+Tab, Enter/Space).
- [ ] Confirmar foco visual em botões e cards.
- [ ] Verificar labels dos controles principais.
- [ ] Testar com leitor de tela se possível (TalkBack/VoiceOver).

### 10) Observações finais
- [ ] Anotar qualquer comportamento inesperado.
- [ ] Registrar falhas de layout ou botões sem resposta.
- [ ] Sugerir melhorias de UX com base na experiência.
