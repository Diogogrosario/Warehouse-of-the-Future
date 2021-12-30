import 'package:flutter/material.dart';

class ActionButton extends StatelessWidget {
  final VoidCallback? _callback;
  final Icon _icon;
  final String _tooltip;

  const ActionButton(this._callback, this._tooltip, this._icon, {Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: _icon,
      tooltip: _tooltip,
      onPressed: _callback,
    );
  }
}
