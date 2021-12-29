import 'package:flutter/material.dart';

class PPButton extends StatefulWidget {
  final VoidCallback? _callback;

  const PPButton(this._callback, {Key? key}) : super(key: key);

  @override
  _PPButtonState createState() => _PPButtonState();
}

class _PPButtonState extends State<PPButton> {
  bool _playing = false;

  bool get isPlaying => _playing;

  void callback() {
    if (widget._callback == null) return;
    widget._callback!();
    setState(() {
      _playing = !_playing;
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
