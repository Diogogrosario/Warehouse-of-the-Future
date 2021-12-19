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
  void skipForward() {
    print("Hello, this is the SFButton callback!");

    var r = math.Random();

    int nodeId1 = -1, nodeId2 = -1;
    while (nodeId1 == nodeId2) {
      nodeId1 = r.nextInt(graph.nodeCount());
      nodeId2 = r.nextInt(graph.nodeCount());
    }

    print(nodeId1.toString() + " " + nodeId2.toString());

    final Node node1 = graph.getNodeUsingId(nodeId1.toString());
    final Node node2 = graph.getNodeUsingId(nodeId2.toString());

    final Edge? edge = graph.getEdgeBetween(node1, node2);
    Paint paint = Paint()
      ..color = (r.nextBool() ? Colors.green : Colors.red)
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;
    if (edge == null) {
      graph.addEdge(node1, node2, paint: paint);
    } else {
      final color = r.nextBool() ? Colors.green : Colors.red;
      edge.paint = paint;
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
