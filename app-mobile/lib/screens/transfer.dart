import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/user_provider.dart';
import '../widgets/rounded_card.dart';
import '../design/tokens.dart';

class TransferScreen extends StatefulWidget {
  @override
  _TransferScreenState createState() => _TransferScreenState();
}

class _TransferScreenState extends State<TransferScreen> with SingleTickerProviderStateMixin {
  String _selectedMachine = 'Garra Teddy #42';
  int _selectedAmount = 50;
  bool _sending = false;

  late AnimationController _animController;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(vsync: this, duration: Duration(seconds: 2));
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  Future<void> _doTransfer(BuildContext context) async {
    final user = Provider.of<UserProvider>(context, listen: false);
    setState(() => _sending = true);
    _animController.repeat();
    final ok = await user.transfer(_selectedAmount, machineId: _selectedMachine);
    _animController.stop();
    setState(() => _sending = false);

    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Row(children: [Icon(ok ? Icons.check_circle : Icons.error, color: ok ? Colors.green : Colors.red), SizedBox(width: 8), Text(ok ? 'Moedas Enviadas!' : 'Falha')]),
        content: Column(mainAxisSize: MainAxisSize.min, children: [Text(ok ? 'Você enviou $_selectedAmount moedas para $_selectedMachine.' : 'Não foi possível completar a transferência.'), SizedBox(height: 12), Text('Saldo atual: ${user.balance}')]),
        actions: [TextButton(onPressed: () => Navigator.of(context).pop(), child: Text('Fechar'))],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final machines = ['Garra Teddy #42', 'Garra Teddy #17', 'Puzzle Teddy #03'];
    return Scaffold(
      appBar: AppBar(title: Text('Transferir Moedas'), backgroundColor: AppColors.bg, elevation: 0),
      backgroundColor: AppColors.bg,
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            RoundedCard(
              semanticLabel: 'Painel de transferência NFC e seleção de máquina',
              child: Column(
                children: [
                  Text('Seu baú: (◯) 1.250', style: TextStyle(fontWeight: FontWeight.bold)),
                  SizedBox(height: 12),
                  // Animated NFC/QR visual
                  SizedBox(
                    height: 160,
                    child: Center(
                      child: Stack(
                        alignment: Alignment.center,
                        children: [
                          // pulsing rings
                          for (int i = 0; i < 3; i++)
                            AnimatedBuilder(
                              animation: _animController,
                              builder: (_, __) {
                                final t = (_animController.value + i * 0.2) % 1.0;
                                final size = 60 + t * 80;
                                final opacity = (1.0 - t).clamp(0.0, 1.0);
                                return Container(width: size, height: size, decoration: BoxDecoration(shape: BoxShape.circle, color: AppColors.primary.withOpacity(0.12 * opacity)));
                              },
                            ),
                          // center icon
                          CircleAvatar(radius: 36, backgroundColor: AppColors.cardAlt, child: Icon(Icons.nfc, color: AppColors.primary, size: 36)),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: 12),
                  Text('Mandar Moedas para a Máquina', style: TextStyle(color: AppColors.softText)),
                ],
              ),
            ),
            SizedBox(height: 14),
            Align(alignment: Alignment.centerLeft, child: Text('Escolha a máquina', style: TextStyle(fontWeight: FontWeight.bold))),
            SizedBox(height: 8),
            SizedBox(
              height: 92,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: machines.length,
                separatorBuilder: (_, __) => SizedBox(width: 12),
                itemBuilder: (context, idx) {
                  final m = machines[idx];
                  final sel = m == _selectedMachine;
                  return GestureDetector(
                    onTap: () => setState(() => _selectedMachine = m),
                    child: Container(
                      width: 180,
                      child: RoundedCard(
                        color: sel ? AppColors.primary : null,
                        child: Row(
                          children: [
                            Container(width: 56, height: 56, decoration: BoxDecoration(color: AppColors.cardAlt, borderRadius: BorderRadius.circular(10))),
                            SizedBox(width: 12),
                            Expanded(child: Text(m, style: TextStyle(color: sel ? Colors.black : Colors.white))),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            SizedBox(height: 14),
            Align(alignment: Alignment.centerLeft, child: Text('Quantas moedas vamos enviar?', style: TextStyle(fontWeight: FontWeight.bold))),
            SizedBox(height: 8),
            Row(mainAxisAlignment: MainAxisAlignment.spaceAround, children: [
              _amountChoice(50),
              _amountChoice(100),
              _amountChoice(200),
            ]),
            Spacer(),
            Row(children: [
              Expanded(
                child: ElevatedButton(
                  onPressed: _sending ? null : () => Navigator.of(context).pop(),
                  style: ElevatedButton.styleFrom(backgroundColor: AppColors.cardAlt, padding: EdgeInsets.symmetric(vertical: 14), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18))),
                  child: Text('VOLTAR', style: TextStyle(color: Colors.white)),
                ),
              ),
              SizedBox(width: 12),
              Expanded(
                child: ElevatedButton(
                  onPressed: _sending ? null : () => _doTransfer(context),
                  style: ElevatedButton.styleFrom(backgroundColor: AppColors.primary, padding: EdgeInsets.symmetric(vertical: 14), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18))),
                  child: _sending ? SizedBox(height:16,width:16,child:CircularProgressIndicator(color: Colors.black, strokeWidth:2)) : Text('ATIVAR TRANSFERÊNCIA', style: TextStyle(color: Colors.black)),
                ),
              ),
            ])
          ],
        ),
      ),
    );
  }

  Widget _amountChoice(int amount) {
    final selected = _selectedAmount == amount;
    return GestureDetector(
      onTap: () => setState(() => _selectedAmount = amount),
      child: Container(
        width: 92,
        height: 92,
        decoration: BoxDecoration(color: selected ? AppColors.primary : AppColors.card, borderRadius: BorderRadius.circular(18)),
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [Icon(Icons.monetization_on, color: selected ? Colors.black : AppColors.accent), SizedBox(height: 6), Text('$amount', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: selected ? Colors.black : Colors.white))]),
      ),
    );
  }
}
