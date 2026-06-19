// Exemplo de como usar as imagens migradas no React Native

import { Image, StyleSheet, View } from 'react-native';

// Importar uma imagem
const homeImage = require('../assets/images/home_dashboard_infantil_teddy_s_house/screen.png');

export default function ExampleScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={homeImage}
        style={styles.fullScreenImage}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fullScreenImage: { width: '100%', height: '100%' },
});

// ============================================
// Imagens disponíveis por tela
// ============================================

/**
 * Para Inicio.tsx:
 * - require('../assets/images/home_dashboard_infantil_teddy_s_house/screen.png')
 *
 * Para Balance.tsx:
 * - require('../assets/images/saldo_e_cashback_infantil_teddy_s_house/screen.png')
 *
 * Para Transfer.tsx:
 * - require('../assets/images/transfer_ncia_de_moedas_infantil_teddy_s_house/screen.png')
 *
 * Para Games.tsx:
 * - require('../assets/images/galeria_de_jogos_infantil_teddy_s_house/screen.png')
 * - require('../assets/images/mini_game_coleta_de_moedas_teddy_s_house/screen.png')
 *
 * Para Profile.tsx:
 * - require('../assets/images/perfil_e_conquistas_infantil_teddy_s_house/screen.png')
 *
 * Outros recursos:
 * - require('../assets/images/recompensa_do_ba_m_gico_teddy_s_house/screen.png')
 * - require('../assets/images/sucesso_na_transfer_ncia_infantil_teddy_s_house/screen.png')
 * - require('../assets/images/magical_teddy_playroom/screen.png')
 */
