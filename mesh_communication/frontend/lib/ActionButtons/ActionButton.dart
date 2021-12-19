import 'package:flutter/material.dart';

class ActionButton extends StatelessWidget {
  final VoidCallback callback;
  final Icon icon;
  final String tooltip;

  const ActionButton(this.callback, this.tooltip, this.icon, {Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: icon,
      tooltip: tooltip,
      onPressed: callback,
    );
  }
}
