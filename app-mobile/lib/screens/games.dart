import 'package:flutter/material.dart';
import '../widgets/rounded_card.dart';
import '../design/tokens.dart';

class GamesScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Arenas', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            SizedBox(height: 12),
            Expanded(
              child: ListView.separated(
                itemCount: 6,
                separatorBuilder: (_, __) => SizedBox(height: 12),
                itemBuilder: (context, idx) {
                  return RoundedCard(
                    semanticLabel: 'Arena card: Reino dos Doces',
                    child: Row(
                      children: [
                        Container(width: 88, height: 72, decoration: BoxDecoration(color: AppColors.cardAlt, borderRadius: BorderRadius.circular(12))),
                        SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Reino dos Doces', style: TextStyle(fontWeight: FontWeight.bold)),
                              SizedBox(height: 6),
                              Text('Uma doce aventura! Pegue pelúcias e prêmios.', style: TextStyle(color: AppColors.softText)),
                            ],
                          ),
                        ),
                        Icon(Icons.arrow_forward_ios, size: 18, color: AppColors.softText),
                      ],
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
