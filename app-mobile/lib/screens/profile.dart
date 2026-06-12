import 'package:flutter/material.dart';
import '../widgets/rounded_card.dart';
import '../design/tokens.dart';

class ProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            RoundedCard(
              semanticLabel: 'Cartão de perfil do usuário Leozinho123',
              child: Column(
                children: [
                  CircleAvatar(radius: 36, backgroundColor: AppColors.cardAlt, child: Icon(Icons.person, size: 36, color: AppColors.primary)),
                  SizedBox(height: 10),
                  Text('Leozinho123', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  SizedBox(height: 4),
                  Text('Nível 15 Explorador', style: TextStyle(color: AppColors.softText)),
                ],
              ),
            ),
            SizedBox(height: 14),
            RoundedCard(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Meta de Recompensas', style: TextStyle(fontWeight: FontWeight.bold)),
                  SizedBox(height: 8),
                  LinearProgressIndicator(value: 0.75, color: AppColors.accent, backgroundColor: AppColors.cardAlt),
                  SizedBox(height: 8),
                  Text('Faltam 250 moedas para o próximo prêmio', style: TextStyle(color: AppColors.softText)),
                ],
              ),
            ),
            SizedBox(height: 18),
            Expanded(child: Center(child: Text('Opções: Histórico, Configurações, etc.'))),
          ],
        ),
      ),
    );
  }
}
