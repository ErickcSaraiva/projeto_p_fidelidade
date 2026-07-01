import 'package:flutter/material.dart';

class AppColors {
  static const bg = Color(0xFF0F1113);
  static const primary = Color(0xFF8AC6FF);
  static const accent = Color(0xFFF5A96B);
  static const card = Color(0xFF15181A);
  static const cardAlt = Color(0xFF0C0D0E);
  static const softText = Color(0xFFBFC7CD);
}

class AppTextStyles {
  static const heading = TextStyle(fontSize: 22, fontWeight: FontWeight.bold);
  static const body = TextStyle(fontSize: 16);
}

class AppShadows {
  static const soft = BoxShadow(
    color: Color.fromRGBO(0, 0, 0, 0.6),
    blurRadius: 18,
    offset: Offset(0, 8),
  );
  static const inset = BoxShadow(
    color: Color.fromRGBO(255, 255, 255, 0.02),
    blurRadius: 6,
    offset: Offset(0, -2),
  );
}
