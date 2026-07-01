import 'package:flutter/material.dart';

class FadeSlidePageRoute<T> extends PageRouteBuilder<T> {
  final Widget child;
  FadeSlidePageRoute({required this.child})
      : super(
          transitionDuration: const Duration(milliseconds: 420),
          reverseTransitionDuration: const Duration(milliseconds: 300),
          pageBuilder: (context, animation, secondaryAnimation) => child,
          transitionsBuilder: (context, animation, secondaryAnimation, widget) {
            final fade = CurvedAnimation(parent: animation, curve: Curves.easeInOut);
            final offset = Tween<Offset>(begin: Offset(0, 0.04), end: Offset.zero).animate(CurvedAnimation(parent: animation, curve: Curves.easeOut));
            return FadeTransition(
              opacity: fade,
              child: SlideTransition(position: offset, child: widget),
            );
          },
        );
}
