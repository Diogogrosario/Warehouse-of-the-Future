import 'dart:collection';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:graphview/GraphView.dart';
import 'package:meshcommunication/RequestHandler/request_handler.dart';
import 'package:meshcommunication/my_graph_display.dart';

import 'my_log.dart';

class MyGraph extends InheritedWidget {
  final Graph graph;
  final RequestHandler requestHandler;
  final MyLog logDisplay;
  HashMap<int, Color> nodeColors;

  MyGraph({
    Key? key,
    required this.graph,
    required this.requestHandler,
    required Widget child,
  })  : logDisplay = MyLog(),
        nodeColors = HashMap(),
        super(key: key, child: child);

  Future<void> _recvMsgs() async {
    Map messages = await requestHandler.getRecvMsgs();

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
          toset = MyGraphDisplay.destColor;
        } else {
          toset = MyGraphDisplay.recvColor;
        }
        edge.paint!.color = toset;
      }
    }
  }

  Future<void> _sendMsgs() async {
    Map messages = await requestHandler.getSendMsgs();

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
        edge.paint!.color = MyGraphDisplay.sendColor;
      }
    }
  }

  void _resetEdges() {
    for (Edge e in graph.edges) {
      e.paint!
        ..color = MyGraphDisplay.normalColor
        ..strokeWidth = MyGraphDisplay.strokeWidth;
    }
  }

  Future<void> _updateEdges() async {
    _resetEdges();
    await _sendMsgs();
    await _recvMsgs();
  }

  Future<void> orchestrate() async {
    await requestHandler.orchestrate();
    await _updateEdges();
  }

  // for control buttons
  Future<void> skipForward() async {
    await requestHandler.advanceTick();
    await _updateEdges();
    await _updateLogs();
  }

  void skipBackwards() {
    print("Hello, this is the SBButton callback!");
  }

  void fastForward() {
    print("Hello, this is the FFButton callback!");
  }

  void pausePlay() {
    print("Called timed function");
    skipForward();
  }

  static MyGraph of(BuildContext context) {
    final MyGraph? result =
        context.dependOnInheritedWidgetOfExactType<MyGraph>();
    assert(result != null, 'No MyGraph found in context');
    return result!;
  }

  @override
  bool updateShouldNotify(MyGraph old) => graph != old.graph;

  Future<void> _updateLogs() async {
    logDisplay.callback!();
  }
}
