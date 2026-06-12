import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';

import 'package:teddys_house_app/screens/balance.dart';

// A small fake UserProvider for tests to avoid network calls.
class FakeUserProvider extends ChangeNotifier {
  String userId = 'user1';
  int balance = 350;
  bool loading = false;

  Future<void> loadBalance() async {
    // no-op for tests
  }

  Future<bool> transfer(int amount, {String machineId = 'machine-1'}) async {
    if (amount <= 0 || amount > balance) return false;
    balance -= amount;
    notifyListeners();
    return true;
  }
}

void main() {
  testWidgets('BalanceScreen shows balance and opens transfer', (WidgetTester tester) async {
    final fakeProvider = FakeUserProvider();

    await tester.pumpWidget(MaterialApp(
      home: ChangeNotifierProvider<FakeUserProvider>.value(
        value: fakeProvider,
        child: BalanceScreen(),
      ),
    ));

    await tester.pumpAndSettle();

    // Expect balance label and value
    expect(find.text('Meu saldo de moedas:'), findsOneWidget);
    expect(find.text('${fakeProvider.balance}'), findsOneWidget);

    // Expect open transfer button
    expect(find.text('Abrir Transferência'), findsOneWidget);

    // Tap open transfer and expect Transfer screen app bar
    await tester.tap(find.text('Abrir Transferência'));
    await tester.pumpAndSettle();

    expect(find.text('Transferir Moedas'), findsOneWidget);
  });
}
