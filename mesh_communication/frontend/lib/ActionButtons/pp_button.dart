import 'dart:async';

import 'package:flutter/material.dart';

class PPButton extends StatefulWidget {
  final VoidCallback? _callback;

  const PPButton(this._callback, {Key? key}) : super(key: key);

  @override
  _PPButtonState createState() => _PPButtonState();
}

class _PPButtonState extends State<PPButton> {
  bool _playing = false;
  late Timer _timer;
  static const int secondsBetweenRequests = 1;

  bool get isPlaying => _playing;

  void callback() {
    if (widget._callback == null) return;
    setState(() {
      _playing = !_playing;
      if (_playing) {
        _timer = Timer.periodic(const Duration(seconds: secondsBetweenRequests),
            (timer) {
          widget._callback!();
        });
      } else {
        _timer.cancel();
      }
      print("is timer active? " + _timer.isActive.toString());
      print("Hello, this is the PPButton callback! Currently " +
          (_playing ? "" : "not ") +
          "playing");
    });
  }

  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: Icon(_playing ? Icons.pause_rounded : Icons.play_arrow_rounded),
      tooltip: _playing ? "Pause auto-play" : "Start auto-play",
      onPressed: widget._callback == null ? null : callback,
    );
  }
}
