import 'package:flutter/material.dart';
import '../design/tokens.dart';

class PrimaryButton extends StatefulWidget {
  final VoidCallback? onPressed;
  final String label;
  final double radius;

  const PrimaryButton({Key? key, required this.onPressed, required this.label, this.radius = 28}) : super(key: key);

  @override
  _PrimaryButtonState createState() => _PrimaryButtonState();
}

class _PrimaryButtonState extends State<PrimaryButton> {
  bool _pressed = false;
  bool _hover = false;

  void _setPressed(bool v) => setState(() => _pressed = v);
  void _setHover(bool v) => setState(() => _hover = v);

  @override
  Widget build(BuildContext context) {
    final scale = _pressed ? 0.98 : 1.0;
    final bg = _hover ? AppColors.primary.withOpacity(0.95) : AppColors.primary;

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
            widget.onPressed?.call();
            return null;
          }),
        },
        child: Semantics(
          button: true,
          label: widget.label,
          child: GestureDetector(
            onTapDown: (_) => _setPressed(true),
            onTapUp: (_) {
              _setPressed(false);
              widget.onPressed?.call();
            },
            onTapCancel: () => _setPressed(false),
            child: AnimatedContainer(
              duration: Duration(milliseconds: 160),
              transform: Matrix4.identity()..scale(scale, scale),
              decoration: BoxDecoration(
                color: bg,
                borderRadius: BorderRadius.circular(widget.radius),
                boxShadow: [BoxShadow(color: Colors.black26, blurRadius: _pressed ? 6 : 12, offset: Offset(0, _pressed ? 3 : 8))],
              ),
              padding: EdgeInsets.symmetric(horizontal: 28, vertical: 14),
              child: Center(child: Text(widget.label, style: TextStyle(color: Colors.black, fontWeight: FontWeight.w700))),
            ),
          ),
        ),
      ),
    );
  }
}
