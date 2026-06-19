# Assets do Projeto Teddy's House Mobile

## Estrutura

- `images/` - Imagens PNGs e outros formatos para telas e componentes
- `fonts/` - Fontes customizadas (TTF, OTF)

## Imagens Disponíveis (do app Flutter)

As imagens abaixo estão disponíveis em `app-mobile/assets/images/` e podem ser migradas para este diretório conforme necessário:

### Telas principais
- `home_dashboard_infantil_teddy_s_house/` - Dashboard inicial (home)
- `saldo_e_cashback_infantil_teddy_s_house/` - Tela de saldo
- `transfer_ncia_de_moedas_infantil_teddy_s_house/` - Tela de transferência
- `transfer_ncia_infantil_teddy_s_house/` - Fluxo de transferência NFC

### Telas secundárias
- `galeria_de_jogos_infantil_teddy_s_house/` - Galeria de jogos
- `perfil_e_conquistas_infantil_teddy_s_house/` - Perfil e conquistas
- `magical_teddy_playroom/` - Sala mágica do Teddy

### Minigames
- `mini_game_coleta_de_moedas_teddy_s_house/` - Minigame: coleta de moedas
- `recompensa_do_ba_m_gico_teddy_s_house/` - Recompensa e baú mágico
- `sucesso_na_transfer_ncia_infantil_teddy_s_house/` - Tela de sucesso

## Como usar

### No React Native

Para usar uma imagem, importe a pasta ou copie os arquivos PNG necessários:

```tsx
import { Image } from 'react-native';

<Image
  source={require('../assets/images/home_dashboard_infantil_teddy_s_house/screen.png')}
  style={{ width: 300, height: 300 }}
/>
```

### Adicionando fontes

1. Coloque os arquivos `.ttf` ou `.otf` em `assets/fonts/`
2. Configure em `app.json` (Expo):

```json
{
  "expo": {
    "plugins": [
      [
        "expo-font",
        {
          "fonts": ["./assets/fonts/MeuFont.ttf"]
        }
      ]
    ]
  }
}
```

3. Use no código:

```tsx
import * as Font from 'expo-font';

useEffect(() => {
  Font.loadAsync({
    'meu-font': require('../assets/fonts/MeuFont.ttf'),
  });
}, []);
```

## Próximos passos

- [ ] Copiar imagens principais para o React Native
- [ ] Adicionar fontes customizadas
- [ ] Criar componentes reutilizáveis com os assets
- [ ] Otimizar imagens para mobile (webp, diferentes resoluções)
