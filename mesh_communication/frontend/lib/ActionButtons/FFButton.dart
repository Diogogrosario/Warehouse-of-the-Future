import 'package:flutter/material.dart';
import 'package:myapp/ActionButtons/ActionButton.dart';

class FFButton extends ActionButton {
  const FFButton(VoidCallback? callback)
      : super(callback, "Fast forward 10 ticks",
            const Icon(Icons.fast_forward_rounded));
}
