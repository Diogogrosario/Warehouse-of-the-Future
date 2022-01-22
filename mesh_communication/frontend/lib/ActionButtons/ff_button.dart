import 'package:flutter/material.dart';
import 'package:meshcommunication/ActionButtons/action_button.dart';

class FFButton extends ActionButton {
  const FFButton(VoidCallback? callback)
      : super(callback, "Fast forward 10 ticks",
            const Icon(Icons.fast_forward_rounded));
}
