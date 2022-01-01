import 'package:flutter/material.dart';
import 'package:meshcommunication/ActionButtons/action_button.dart';

class SBButton extends ActionButton {
  const SBButton(VoidCallback? callback)
      : super(callback, "Go back to the previous tick",
            const Icon(Icons.skip_previous_rounded));
}
