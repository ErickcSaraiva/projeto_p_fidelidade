import 'package:flutter/material.dart';
import '../design/tokens.dart';

class RoundedCard extends StatefulWidget {
  final Widget child;
  final EdgeInsetsGeometry padding;
  final double radius;
  final Color? color;
  final VoidCallback? onTap;
  final String? semanticLabel;

  const RoundedCard({Key? key, required this.child, this.padding = const EdgeInsets.all(16), this.radius = 20, this.color, this.onTap, this.semanticLabel}) : super(key: key);

  @override
  _RoundedCardState createState() => _RoundedCardState();
}

class _RoundedCardState extends State<RoundedCard> {
  bool _pressed = false;
  bool _hover = false;

  void _setPressed(bool v) => setState(() => _pressed = v);
  void _setHover(bool v) => setState(() => _hover = v);

  @override
  Widget build(BuildContext context) {
    final baseColor = widget.color ?? AppColors.card;
    final bg = _hover ? baseColor.withOpacity(0.98) : baseColor;
    final scale = _pressed ? 0.985 : 1.0;

    return MouseRegion(
      onEnter: (_) => _setHover(true),
      onExit: (_) => _setHover(false),
      child: FocusableActionDetector(
        shortcuts: const <LogicalKeySet, Intent>{
          LogicalKeySet(LogicalKeyboardKey.enter): ActivateIntent(),
          LogicalKeySet(LogicalKeyboardKey.space): ActivateIntent(),
        },
        actions: <Type, Action<Intent>>{
          ActivateIntent: CallbackAction<ActivateIntent>(onInvoke: (intent) {
            if (widget.onTap != null) widget.onTap!();
            return null;
          }),
        },
        child: GestureDetector(
          onTapDown: (_) => _setPressed(true),
          onTapUp: (_) {
            _setPressed(false);
            if (widget.onTap != null) widget.onTap!();
          },
          onTapCancel: () => _setPressed(false),
          child: Semantics(
            container: true,
            button: widget.onTap != null,
            label: widget.semanticLabel,
            child: AnimatedContainer(
              duration: Duration(milliseconds: 180),
              transform: Matrix4.identity()..scale(scale, scale),
              decoration: BoxDecoration(
                color: bg,
                borderRadius: BorderRadius.circular(widget.radius),
                boxShadow: [AppShadows.soft],
              ),
              padding: widget.padding,
              child: widget.child,
            ),
          ),
        ),
      ),
    );
  }
}
