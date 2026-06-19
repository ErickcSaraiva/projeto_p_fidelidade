import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';

const PROFILE_OPTIONS = [
  { label: 'Configurações', icon: '⚙️' },
  { label: 'Ajuda', icon: '❓' },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Perfil</Text>

        <View style={styles.card} accessibilityLabel="Informações do usuário">
          <Text style={styles.cardTitle}>Nome do Usuário</Text>
          <Text style={styles.cardSubtitle}>Saldo atual: 1.250 moedas</Text>
        </View>

        <View style={styles.card} accessibilityLabel="Opções de conta e configurações">
          {PROFILE_OPTIONS.map((option) => (
            <Pressable key={option.label} style={styles.optionRow} accessibilityRole="button">
              <Text style={styles.optionIcon}>{option.icon}</Text>
              <Text style={styles.optionLabel}>{option.label}</Text>
              <Text style={styles.optionArrow}>›</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F5FF' },
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: '800', color: '#111827', marginBottom: 16 },
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
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 8 },
  cardSubtitle: { color: '#6B7280' },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  optionIcon: { fontSize: 18, marginRight: 12 },
  optionLabel: { fontSize: 16, color: '#111827', flex: 1 },
  optionArrow: { fontSize: 18, color: '#9CA3AF' },
});
