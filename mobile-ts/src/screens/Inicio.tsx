import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DAILY_GAMES = [
  { title: 'Desafio Teddy', subtitle: 'Jogue e ganhe moedas' },
  { title: 'Batalha dos Ursos', subtitle: 'Colete pelúcias mágicas' },
  { title: 'Caça ao Tesouro', subtitle: 'Encontre prêmios escondidos' },
  { title: 'Missão Doce', subtitle: 'Complete tarefas e vença' },
];

export default function InicioScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.icon}>🐻</Text>
          <Text style={styles.title}>início</Text>
        </View>

        <View style={styles.welcomeCard} accessibilityLabel="Cartão de boas-vindas: abrir opções de transferência e jogos">
          <Text style={styles.cardTitle}>Bem-vindo à Teddy's House</Text>
          <Text style={styles.cardSubtitle}>Transfira créditos, jogue e ganhe prêmios!</Text>
          <View style={styles.buttonRow}>
            <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('transferência')}>
              <Text style={styles.primaryButtonText}>Transferir</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('jogos')}>
              <Text style={styles.secondaryButtonText}>Jogos</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Jogos Diários</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {DAILY_GAMES.map((game) => (
            <View key={game.title} style={styles.gameCard}>
              <View style={styles.gameThumbnail}>
                <Text style={styles.gameEmoji}>🎮</Text>
              </View>
              <Text style={styles.gameCardTitle}>{game.title}</Text>
              <Text style={styles.gameCardSubtitle}>{game.subtitle}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Conteúdo principal</Text>
        <View style={styles.mainCard}>
          <Text style={styles.mainCardTitle}>Explorar promoções</Text>
          <Text style={styles.mainCardText}>
            Acompanhe as novidades da Teddy's House, conquiste bônus e descubra prêmios exclusivos para seu brinquedo favorito.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F5FF' },
  container: { padding: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  icon: { fontSize: 28 },
  title: { fontSize: 24, fontWeight: '800', marginLeft: 8, color: '#111827' },
  welcomeCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
    marginBottom: 22,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937' },
  cardSubtitle: { marginTop: 8, color: '#6B7280', lineHeight: 20 },
  buttonRow: { flexDirection: 'row', marginTop: 18, gap: 12 },
  primaryButton: {
    flex: 1,
    backgroundColor: '#3D5AFE',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#fff', fontWeight: '700' },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: { color: '#1F2937', fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 12 },
  horizontalList: { paddingBottom: 8 },
  gameCard: {
    width: 148,
    marginRight: 12,
    borderRadius: 20,
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  gameThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  gameEmoji: { fontSize: 28 },
  gameCardTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 6 },
  gameCardSubtitle: { fontSize: 12, color: '#6B7280', lineHeight: 18 },
  mainCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
    marginBottom: 24,
  },
  mainCardTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 8 },
  mainCardText: { fontSize: 14, color: '#4B5563', lineHeight: 20 },
});
