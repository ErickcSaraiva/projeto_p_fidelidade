import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';

const GAMES = [
  {
    title: 'Reino dos Doces',
    description: 'Uma doce aventura! Pegue pelúcias e prêmios.',
  },
  {
    title: 'Mundo Mágico',
    description: 'Desafios rápidos para ganhar moedas extras.',
  },
  {
    title: 'Floresta Encantada',
    description: 'Colete itens e conquiste troféus.',
  },
  {
    title: 'Fábrica dos Ursos',
    description: 'Complete atividades e desbloqueie brindes.',
  },
];

export default function GamesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Arenas</Text>
        <Text style={styles.subtitle}>Escolha um jogo e ganhe prêmios para seu Teddy.</Text>

        {GAMES.map((game) => (
          <Pressable key={game.title} style={styles.card} accessibilityRole="button">
            <View style={styles.cardHeader}>
              <View style={styles.iconPlaceholder} />
              <Text style={styles.cardTitle}>{game.title}</Text>
            </View>
            <Text style={styles.cardDescription}>{game.description}</Text>
            <Text style={styles.cardAction}>Jogar agora</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F5FF' },
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: '800', color: '#111827', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 18 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  iconPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    marginRight: 12,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', flex: 1 },
  cardDescription: { color: '#4B5563', lineHeight: 20, marginBottom: 14 },
  cardAction: { color: '#3D5AFE', fontWeight: '700' },
});
