import 'package:flutter/material.dart';
import 'package:graphview/GraphView.dart';
import 'package:myapp/RequestHandler/RequestHandler.dart';
import 'dart:math' as math;

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
      e.paint!.color = Colors.grey;
    }

    Map messages = await requestHandler.advanceTick();
    print(messages);

    for (String deviceIdStr in messages.keys) {
      int deviceId = int.parse(deviceIdStr);
      print(deviceIdStr);
      final Node node1 = graph.getNodeUsingId(deviceId);
      for (var target in messages[deviceIdStr]) {
        int targetId = target["hop"];

        final Node node2 = graph.getNodeUsingId(targetId);
        final Edge? edge = graph.getEdgeBetween(node1, node2);
        if (edge == null) {
          print("For some reason the edge " +
              deviceId.toString() +
              " -- " +
              targetId.toString() +
              " is missing");
        }

        print(targetId.toString() + " " + target["final"].toString());
        if (target["failed"]) {
          edge!.paint!.color = Colors.red;
        } else if (targetId == target["final"]) {
          edge!.paint!.color = Colors.green;
        } else {
          edge!.paint!.color = Colors.black;
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
