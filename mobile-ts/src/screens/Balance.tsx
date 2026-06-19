import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, FlatList, Alert } from 'react-native';
import ApiService from '../services/api';

const api = new ApiService();
const AMOUNTS = [50, 100, 200];
const MACHINES = ['Máquina 1', 'Máquina 2', 'Máquina 3'];

export default function BalanceScreen() {
  const [balance, setBalance] = useState<number | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [selectedMachine, setSelectedMachine] = useState<string>('Máquina 1');
  const [loading, setLoading] = useState<boolean>(true);
  const [sending, setSending] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Array<any>>([]);

  async function loadData() {
    try {
      setLoading(true);
      const currentBalance = await api.getBalance('user1');
      setBalance(currentBalance);
      const txs = await api.getTransactions('user1');
      setTransactions(txs);
    } catch (error) {
      console.warn(error);
      Alert.alert('Erro', 'Não foi possível carregar os dados.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleTransfer() {
    if (!balance || selectedAmount > balance) {
      return Alert.alert('Saldo insuficiente', 'Escolha um valor menor ou carregue seu saldo.');
    }

    Alert.alert(
      'Confirmar transferência',
      `Transferir ${selectedAmount} moedas para ${selectedMachine}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              setSending(true);
              const result = await api.transfer('user1', selectedAmount, selectedMachine);
              if (result.status === 'ok') {
                Alert.alert('Sucesso', `Transferência de ${selectedAmount} concluída.`);
                await loadData();
              } else {
                Alert.alert('Erro', 'Falha ao transferir.');
              }
            } catch (error) {
              console.warn(error);
              Alert.alert('Erro', 'Falha ao transferir.');
            } finally {
              setSending(false);
            }
          },
        },
      ],
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CASHBACK / SALDO</Text>
      <View style={styles.card} accessibilityLabel="Informações de saldo e ações de transferência">
        <Text style={styles.label}>Meu saldo de moedas:</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#3D5AFE" style={{ marginTop: 16 }} />
        ) : (
          <Text style={styles.balance}>{balance}</Text>
        )}

        <Text style={styles.label}>Selecionar máquina</Text>
        <View style={styles.machineRow}>
          {MACHINES.map((machine) => {
            const selected = selectedMachine === machine;
            return (
              <Pressable
                key={machine}
                onPress={() => setSelectedMachine(machine)}
                style={[styles.machineButton, selected && styles.machineButtonSelected]}
              >
                <Text style={[styles.machineText, selected && styles.machineTextSelected]}>{machine}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={[styles.label, { marginTop: 16 }]}>Selecionar valor</Text>
        <View style={styles.amountRow}>
          {AMOUNTS.map((amount) => {
            const selected = selectedAmount === amount;
            const disabled = !!balance && balance < amount;
            return (
              <Pressable
                key={amount}
                onPress={() => !disabled && setSelectedAmount(amount)}
                style={[
                  styles.amountButton,
                  selected && styles.amountButtonSelected,
                  disabled && styles.amountButtonDisabled,
                ]}
              >
                <Text style={[styles.amountText, selected && styles.amountTextSelected]}>{amount}</Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          style={[styles.transferButton, (sending || (balance !== null && selectedAmount > balance)) && styles.transferButtonDisabled]}
          onPress={handleTransfer}
          disabled={sending || (balance !== null && selectedAmount > balance)}
        >
          <Text style={styles.transferButtonText}>TRANSFERIR {selectedAmount}</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Histórico recente</Text>
      {loading ? (
        <ActivityIndicator size="small" color="#3D5AFE" style={{ marginTop: 12 }} />
      ) : transactions.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma transação ainda</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={transactions}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => (
            <View style={styles.txCard}>
              <Text style={styles.txTitle}>Máquina: {item.machine_id}</Text>
              <Text style={styles.txSubtitle}>ID: {item.id}</Text>
              <Text style={styles.txAmount}>-{item.amount}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F2F5FF' },
  header: { fontSize: 20, fontWeight: '700', marginBottom: 18, color: '#1E2A78' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 3,
  },
  label: { color: '#6B7280', fontSize: 14 },
  balance: { marginTop: 10, fontSize: 36, fontWeight: '800', color: '#3D5AFE' },
  amountRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18 },
  amountButton: {
    width: 92,
    height: 92,
    borderRadius: 18,
    backgroundColor: '#E8EAFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountButtonSelected: { backgroundColor: '#3D5AFE' },
  amountButtonDisabled: { opacity: 0.4 },
  amountText: { fontSize: 20, fontWeight: '700', color: '#1F2937' },
  amountTextSelected: { color: '#fff' },
  transferButton: {
    marginTop: 18,
    backgroundColor: '#3D5AFE',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  transferButtonDisabled: { backgroundColor: '#A0B4FF' },
  transferButtonText: { color: '#fff', fontWeight: '700' },
  sectionTitle: { marginTop: 22, fontSize: 16, fontWeight: '700', color: '#111827' },
  machineRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  machineButton: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: '#E8EAFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  machineButtonSelected: { backgroundColor: '#3D5AFE' },
  machineText: { color: '#1F2937', fontWeight: '700' },
  machineTextSelected: { color: '#fff' },
  emptyText: { marginTop: 12, color: '#6B7280' },
  list: { marginTop: 12 },
  txCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  txTitle: { fontSize: 14, fontWeight: '700' },
  txSubtitle: { marginTop: 4, color: '#6B7280', fontSize: 12 },
  txAmount: { marginTop: 10, color: '#3D5AFE', fontWeight: '800', fontSize: 16, textAlign: 'right' },
});
