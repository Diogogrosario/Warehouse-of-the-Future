import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:graphview/GraphView.dart';
import 'package:myapp/MyGraphDisplay.dart';
import 'package:myapp/RequestHandler/RequestHandler.dart';

class MyGraph extends InheritedWidget {
  final Graph graph;
  final RequestHandler requestHandler;

  const MyGraph({
    Key? key,
    required this.graph,
    required this.requestHandler,
    required Widget child,
  }) : super(key: key, child: child);

  // for control buttons
  Future<void> skipForward() async {
    print("Hello, this is the SFButton callback!");

    // TODO make this pretty
    for (Edge e in graph.edges) {
      e.paint!
        ..color = MyGraphDisplay.normalColor
        ..strokeWidth = MyGraphDisplay.strokeWidth;
    }

    Map messages = await requestHandler.advanceTick();
    print(messages);

    for (String deviceIdStr in messages.keys) {
      int deviceId = int.parse(deviceIdStr);
      final Node node1 = graph.getNodeUsingId(deviceId);
      for (var target in messages[deviceIdStr]) {
        int targetId = target["hop"];

        final Node node2 = graph.getNodeUsingId(targetId);
        final Edge? edge = graph.getEdgeBetween(node1, node2);
        if (edge == null) {
          if (kDebugMode) {
            print("For some reason the edge " +
                deviceId.toString() +
                " -- " +
                targetId.toString() +
                " is missing");
          }
          continue;
        }

        edge.paint!.strokeWidth = MyGraphDisplay.highlightStrokeWidth;
        Color toset;
        if (target["failed"]) {
          toset = MyGraphDisplay.failColor;
        } else if (targetId == target["final"]) {
          edge.paint!.color = MyGraphDisplay.destColor;
        } else {
          edge.paint!.color = MyGraphDisplay.transColor;
        }
      }
    }
  }

  void skipBackwards() {
    print("Hello, this is the SBButton callback!");
  }

  void fastForward() {
    print("Hello, this is the FFButton callback!");
  }

  void pausePlay() {
    print("Bazinga!");
  }

  static MyGraph of(BuildContext context) {
    final MyGraph? result =
        context.dependOnInheritedWidgetOfExactType<MyGraph>();
    assert(result != null, 'No MyGraph found in context');
    return result!;
  }

  @override
  bool updateShouldNotify(MyGraph old) => graph != old.graph;
}
