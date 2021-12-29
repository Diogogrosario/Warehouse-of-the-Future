import 'package:flutter/material.dart';
import 'package:meshcommunication/ActionButtons/ActionButton.dart';

class SFButton extends ActionButton {
  const SFButton(VoidCallback? callback)
      : super(callback, "Advance to the next tick",
            const Icon(Icons.skip_next_rounded));
}
