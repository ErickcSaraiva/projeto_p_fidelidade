import 'package:flutter/material.dart';
import '../widgets/rounded_card.dart';
import '../design/tokens.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: 6),
            Row(
              children: [
                Icon(Icons.pets, color: AppColors.primary, size: 28),
                SizedBox(width: 8),
                Text("TEDDY'S HOUSE", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
              ],
            ),
            SizedBox(height: 14),
            RoundedCard(
              semanticLabel: 'Cartão de boas-vindas: abrir opções de transferência e jogos',
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Bem-vindo à Teddy\'s House', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  SizedBox(height: 8),
                  Text('Transfira créditos, jogue e ganhe prêmios!', style: TextStyle(color: AppColors.softText)),
                ],
              ),
            ),
            SizedBox(height: 18),
            Text('Jogos Diários', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
            SizedBox(height: 10),
            SizedBox(
              height: 140,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: 4,
                separatorBuilder: (_, __) => SizedBox(width: 12),
                itemBuilder: (context, idx) {
                  return Container(
                    width: 120,
                    child: RoundedCard(
                      padding: EdgeInsets.all(8),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Expanded(child: Icon(Icons.videogame_asset, size: 48, color: AppColors.accent)),
                          SizedBox(height: 6),
                          Text('Jogar Agora', style: TextStyle(fontSize: 12)),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
            SizedBox(height: 12),
            Expanded(child: Center(child: Text('Conteúdo principal (minigames, promoções, etc.)'))),
          ],
        ),
      ),
    );
  }
}
