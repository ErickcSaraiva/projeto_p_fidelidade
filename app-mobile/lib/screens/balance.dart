import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/user_provider.dart';
import 'transfer.dart';
import '../widgets/page_transitions.dart';
import '../widgets/rounded_card.dart';
import '../widgets/primary_button.dart';
import '../design/tokens.dart';

class BalanceScreen extends StatefulWidget {
  @override
  _BalanceScreenState createState() => _BalanceScreenState();
}

class _BalanceScreenState extends State<BalanceScreen> {
  int _selectedAmount = 50;

  Widget _amountButton(int amount, int balance) {
    final selected = _selectedAmount == amount;
    final disabled = balance < amount;

    return GestureDetector(
      onTap: disabled ? null : () => setState(() => _selectedAmount = amount),
      child: AnimatedContainer(
        duration: Duration(milliseconds: 220),
        width: 92,
        height: 92,
        decoration: BoxDecoration(
          color: selected ? AppColors.primary : AppColors.cardAlt,
          borderRadius: BorderRadius.circular(18),
          border: selected ? Border.all(color: Colors.white24, width: 2) : null,
          boxShadow: selected
              ? [BoxShadow(color: Colors.black.withOpacity(0.45), blurRadius: 14, offset: Offset(0, 8))]
              : [BoxShadow(color: Colors.black.withOpacity(0.3), blurRadius: 8, offset: Offset(0, 6))],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.monetization_on, color: selected ? Colors.black : AppColors.accent),
            SizedBox(height: 8),
            Text(
              '$amount',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: selected ? Colors.black : Colors.white,
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Consumer<UserProvider>(builder: (context, user, _) {
        return Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(height: 8),
              Text("CASHBACK/SALDO", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
              SizedBox(height: 18),
              RoundedCard(
                semanticLabel: 'Informações de saldo e ações de transferência',
                padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 20),
                child: Column(
                  children: [
                    Text("Meu saldo de moedas:", style: TextStyle(color: AppColors.softText)),
                    SizedBox(height: 8),
                    user.loading
                        ? CircularProgressIndicator()
                        : Text(
                            '${user.balance}',
                            style: TextStyle(fontSize: 36, color: AppColors.primary, fontWeight: FontWeight.bold),
                          ),
                    SizedBox(height: 12),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _amountButton(50, user.balance),
                        _amountButton(100, user.balance),
                        _amountButton(200, user.balance),
                      ],
                    ),
                    SizedBox(height: 18),
                    Column(
                      children: [
                        PrimaryButton(
                          onPressed: user.loading || user.balance < _selectedAmount
                              ? null
                              : () async {
                                  final success = await user.transfer(_selectedAmount);
                                  final title = success ? 'Sucesso' : 'Erro';
                                  final body = success
                                      ? 'Transferência de $_selectedAmount concluída.'
                                      : 'Falha ao transferir.';
                                  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('$title: $body')));
                                },
                          label: 'Ativar Transferência ($_selectedAmount)'.toUpperCase(),
                        ),
                        SizedBox(height: 10),
                        ElevatedButton(
                          onPressed: () => Navigator.of(context).push(FadeSlidePageRoute(child: TransferScreen())),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.cardAlt,
                            padding: EdgeInsets.symmetric(horizontal: 28, vertical: 12),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                          ),
                          child: Text('Abrir Transferência', style: TextStyle(color: Colors.white)),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              SizedBox(height: 20),
              Text('Histórico recente', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
                        Expanded(
                          child: user.transactionsLoading
                              ? Center(child: CircularProgressIndicator())
                              : user.transactions.isEmpty
                                  ? Center(child: Text('Nenhuma transação ainda', style: TextStyle(color: AppColors.softText)))
                                  : ListView.separated(
                                      itemCount: user.transactions.length,
                                      separatorBuilder: (_, __) => SizedBox(height: 12),
                                      itemBuilder: (context, index) {
                                        final tx = user.transactions[index];
                                        return RoundedCard(
                                          child: ListTile(
                                            contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                                            title: Text('Máquina: ${tx['machine_id']}', style: TextStyle(fontWeight: FontWeight.bold)),
                                            subtitle: Text('ID: ${tx['id']}'),
                                            trailing: Text('-${tx['amount']}', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold)),
                                          ),
                                        );
                                      },
                                    ),
                        ),
        );
      }),
    );
  }
}
