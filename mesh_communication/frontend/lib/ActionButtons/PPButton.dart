import 'package:flutter/material.dart';

class PPButton extends StatefulWidget {
  final VoidCallback callback;

  const PPButton(this.callback, {Key? key}) : super(key: key);

  @override
  _PPButtonState createState() => _PPButtonState();
}

class _PPButtonState extends State<PPButton> {
  bool playing = false;

  void callback() {
    widget.callback();
    setState(() {
      playing = !playing;
      print("Hello, this is the PPButton callback! Currently " +
          (playing ? "" : "not ") +
          "playing");
    });
  }

  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: Icon(playing ? Icons.pause_rounded : Icons.play_arrow_rounded),
      tooltip: playing ? "Pause auto-play" : "Start auto-play",
      onPressed: callback,
    );
  }
}
