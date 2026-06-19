# Minigames - Tech Stack Decision

## Análise de Opções

### 1. **React Native + Animated API** (Recomendado para 2D simples)
**Pros:**
- Integração nativa com React Native
- Sem dependências externas pesadas
- Bom para jogos 2D simples com lógica de negócio

**Contras:**
- Limitado para gráficos complexos
- Performance não é a melhor para games intensivos
- Difícil para physics e colisão avançada

**Ideal para:** Puzzle simples, coleta de moedas, cliques, desafios rápidos

---

### 2. **Phaser 3** (Recomendado para 2D com física)
**Pros:**
- Framework de jogos robusto para 2D
- Suporte a Física, Animação, Colisão nativa
- Comunidade grande, muitos exemplos
- Funciona bem em mobile

**Contras:**
- Precisa de Web View (não é React Native puro)
- Mais peso/overhead
- Curva de aprendizado

**Ideal para:** Plataformers, action games, physics-based games

---

### 3. **Babylon.js** (Para 3D)
**Pros:**
- Motor 3D profissional
- WebGL, render de alta qualidade
- Bem documentado

**Contras:**
- Overkill para minigames simples
- Maior peso na app
- Curva de aprendizado alta

**Ideal para:** Experiências 3D imersivas, slots 3D

---

### 4. **HTML5 Canvas via WebView** (Flexível)
**Pros:**
- Máxima flexibilidade
- Pode usar qualquer lib JS (PixiJS, Kaboom, etc.)
- Fácil integração com backend

**Contras:**
- Performance variável
- Overhead de WebView
- Curva de aprendizado depende da lib

**Ideal para:** Qualquer tipo de minigame com HTML5

---

## 🎯 Recomendação Final

### **Abordagem Híbrida (Recomendada)**

#### **Tier 1 - Minigames Simples:** React Native + Animated
- Coleta de moedas (tap/swipe)
- Quiz/Perguntas
- Desafios de tempo

#### **Tier 2 - Minigames com Física:** Phaser 3 via WebView
- Garras (clawmachine style)
- Plataformers simples
- Puzzle com física

#### **Tier 3 - Experiências Premium:** Babylon.js via WebView
- Slots 3D
- Ambientes exploráveis

---

## 🚀 Implementação Recomendada

### Estrutura de Pastas Proposta

```
mobile-ts/
├── src/
│   ├── games/
│   │   ├── simple/           # React Native puro
│   │   │   ├── CoinCollector/
│   │   │   ├── QuickTap/
│   │   │   └── ...
│   │   │
│   │   ├── webview/          # HTML5 + Phaser/Babylon
│   │   │   ├── games/
│   │   │   │   ├── clawmachine.html
│   │   │   │   ├── platformer.html
│   │   │   │   └── ...
│   │   │   ├── lib/          # Phaser, Babylon configs
│   │   │   └── index.html
│   │   │
│   │   └── GameContainer.tsx # Component que escolhe qual renderizar
│   │
│   └── screens/
│       └── Games.tsx         # Lista e navega para minigames
```

### Tecnologias Específicas

**React Native Simples:**
- `react-native-animated` (built-in)
- `react-native-gesture-handler` (já instalado)
- `react-native-reanimated` (para animações avançadas)

**WebView Tier:**
- `react-native-webview` (render HTML/JS)
- `phaser` (framework de jogos 2D)
- `babylon.js` (engine 3D)

**Comunicação:**
- Bridge de API entre minigame e backend (passar user_id, moedas ganhas, etc.)

---

## 📋 Próximos Passos

1. **Instalar dependências base:**
   ```bash
   npm install react-native-webview react-native-reanimated phaser
   ```

2. **Criar primeiro minigame simples** (React Native):
   - Exemplo: Tap para coletar moedas

3. **Criar WebView wrapper** para Phaser:
   - Exemplo: Clawmachine game

4. **Integrar com backend:**
   - Endpoint: `POST /games/complete` (recebe: user_id, game_id, score, coins_earned)

---

## 📊 Comparação Rápida

| Aspecto | React Native | Phaser | Babylon |
|---------|-------------|---------|----------|
| Facilidade | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| Performance | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Complexidade Gráfica | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Curva Aprendizado | Baixa | Média | Alta |
| Peso/Tamanho | Mínimo | Médio | Alto |

---

## 🎮 Exemplo de Minigame - "Coin Collector"

```typescript
// mobile-ts/src/games/simple/CoinCollector/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Pressable, Text, StyleSheet, Animated } from 'react-native';

export default function CoinCollector() {
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const animation = new Animated.Value(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleCoinTap = () => {
    setCoinsCollected(c => c + 1);
    Animated.sequence([
      Animated.timing(animation, { toValue: 1, duration: 200, useNativeDriver: false }),
      Animated.timing(animation, { toValue: 0, duration: 200, useNativeDriver: false }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{timeLeft}s</Text>
      <Text style={styles.score}>Moedas: {coinsCollected}</Text>
      <Pressable style={styles.coin} onPress={handleCoinTap}>
        <Text style={styles.coinEmoji}>🪙</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  timer: { fontSize: 32, fontWeight: 'bold' },
  score: { fontSize: 20 },
  coin: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFD700', justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  coinEmoji: { fontSize: 60 },
});
```

---

## ⚠️ Notas Importantes

- **Performance:** Teste em dispositivos reais (não só emulador)
- **Backend:** Prepare um sistema de verificação de fraude (validar scores no servidor)
- **Analytics:** Rastreie qual minigame converte melhor
- **Balanceamento:** Ajuste dificuldade e recompensas com base em dados
