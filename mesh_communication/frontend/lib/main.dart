import 'dart:html';

import 'package:flutter/material.dart';
import 'package:graphview/GraphView.dart';
import 'package:meshcommunication/ActionButtons/FFButton.dart';
import 'package:meshcommunication/ActionButtons/PPButton.dart';
import 'package:meshcommunication/ActionButtons/SBButton.dart';
import 'package:meshcommunication/ActionButtons/SFButton.dart';
import 'package:meshcommunication/MyGraph.dart';
import 'package:meshcommunication/MyGraphDisplay.dart';
import 'package:meshcommunication/RequestHandler/Device.dart';
import 'package:meshcommunication/RequestHandler/RequestHandler.dart';
import 'package:meshcommunication/UndirectedGraph.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: BasePage(),
    );
  }
}

class BasePage extends StatelessWidget {
  const BasePage({Key? key}) : super(key: key);

  Future<Graph> _genGraph(RequestHandler requestHandler) async {
    Graph graph = UndirectedGraph();

    // gen nodes
    List<Device> devices = await requestHandler.getDevices();
    for (Device d in devices) {
      Node newNode = Node.Id(d.id);
      //newNode.size = const Size(20.0, 30.0);
      //newNode.position = const Offset(0.0, -30.0);
      graph.addNode(newNode);
    }
    // gen edges
    for (Device d in devices) {
      // TODO could be optimized by using a single request
      List<int> neighbors = await requestHandler.getEdges(d.id.toString());
      Node node1 = graph.getNodeUsingId(d.id);
      for (int nid in neighbors) {
        Node node2 = graph.getNodeUsingId(nid);
        graph.addEdge(node1, node2,
            paint: Paint()
              ..color = MyGraphDisplay.normalColor
              ..strokeWidth = MyGraphDisplay.strokeWidth
              ..style = PaintingStyle.stroke);
      }
    }

    return graph;
  }

  Widget _genGraphPage(BuildContext context) {
    final MyGraphDisplay graphDisplay = MyGraphDisplay(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Mesh Communication",
          key: Key("appTitle"),
        ),
        actions: [
          SBButton(MyGraph.of(context).skipBackwards),
          PPButton(MyGraph.of(context).pausePlay),
          SFButton(MyGraph.of(context).skipForward),
          FFButton(MyGraph.of(context).fastForward),
        ],
      ),
      body: graphDisplay,
      persistentFooterButtons: [
        IconButton(
          onPressed: graphDisplay.resetGraphView,
          icon: const Icon(Icons.replay_rounded),
        ),
        IconButton(
          onPressed: MyGraph.of(context).orchestrate,
          icon: const Icon(Icons.rss_feed),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    RequestHandler requestHandler = RequestHandler("http://localhost:8080");

    return FutureBuilder<Graph>(
      future: _genGraph(requestHandler),
      builder: (context, response) {
        if (response.connectionState == ConnectionState.done) {
          Graph graph = response.data!;
          return MyGraph(
            graph: graph,
            requestHandler: requestHandler,
            child: Builder(
              builder: (BuildContext innerContext) {
                return _genGraphPage(innerContext);
              },
            ),
          );
        } else {
          // still loading
          return Scaffold(
            appBar: AppBar(
              title: const Text(
                "Mesh Communication",
                key: Key("appTitle"),
              ),
              actions: const [
                SBButton(null),
                PPButton(null),
                SFButton(null),
                FFButton(null),
              ],
            ),
            persistentFooterButtons: const [
              IconButton(
                onPressed: null,
                icon: Icon(Icons.replay_rounded),
              ),
              IconButton(
                onPressed: null,
                icon: Icon(Icons.rss_feed),
              ),
            ],
          );
        }
      },
    );
  }
}
