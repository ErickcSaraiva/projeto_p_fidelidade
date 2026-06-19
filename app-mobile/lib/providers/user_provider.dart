import 'package:flutter/material.dart';
import '../services/api_service.dart';

class UserProvider extends ChangeNotifier {
  final ApiService api;
  String userId = 'user1';
  int balance = 0;
  bool loading = false;
  bool transactionsLoading = false;
  List<Map<String, dynamic>> transactions = [];

  UserProvider([ApiService? apiService]) : api = apiService ?? ApiService() {
    loadBalance();
    loadTransactions();
  }

  Future<void> loadBalance() async {
    loading = true;
    notifyListeners();
    try {
      final b = await api.getBalance(userId);
      balance = b;
    } catch (e) {
      // ignore errors for prototype
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  Future<void> loadTransactions() async {
    transactionsLoading = true;
    notifyListeners();
    try {
      transactions = await api.getTransactions(userId);
    } catch (e) {
      transactions = [];
    } finally {
      transactionsLoading = false;
      notifyListeners();
    }
  }

  Future<bool> transfer(int amount, {String machineId = 'machine-1'}) async {
    try {
      final res = await api.transfer(userId, amount, machineId);
      if (res.containsKey('balance')) {
        balance = res['balance'];
        notifyListeners();
      }
      await loadTransactions();
      return true;
    } catch (e) {
      return false;
    }
  }
}
