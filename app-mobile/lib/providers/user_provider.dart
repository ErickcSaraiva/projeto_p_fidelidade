import 'package:flutter/material.dart';
import '../services/api_service.dart';

class UserProvider extends ChangeNotifier {
  final ApiService api;
  String userId = 'user1';
  int balance = 0;
  bool loading = false;

  UserProvider([ApiService? apiService]) : api = apiService ?? ApiService() {
    loadBalance();
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

  Future<bool> transfer(int amount, {String machineId = 'machine-1'}) async {
    try {
      final res = await api.transfer(userId, amount, machineId);
      if (res.containsKey('balance')) {
        balance = res['balance'];
        notifyListeners();
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}
