import 'package:flutter/material.dart';
import 'package:graphview/GraphView.dart';
import 'package:myapp/ActionButtons/FFButton.dart';
import 'package:myapp/ActionButtons/PPButton.dart';
import 'package:myapp/ActionButtons/SBButton.dart';
import 'package:myapp/ActionButtons/SFButton.dart';
import 'package:myapp/MyGraph.dart';
import 'package:myapp/MyGraphDisplay.dart';
import 'package:myapp/RequestHandler/Device.dart';
import 'package:myapp/RequestHandler/RequestHandler.dart';
import 'package:myapp/UndirectedGraph.dart';

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
      graph.addNode(Node.Id(d.id));
    }
    // gen edges
    for (Device d in devices) {
      List<String> neighbors = await requestHandler.getEdges(d.id);
      Node node1 = graph.getNodeUsingId(d.id);
      for (String nid in neighbors) {
        Node node2 = graph.getNodeUsingId(nid);
        graph.addEdge(node1, node2,
            paint: Paint()
              ..color = Colors.grey
              ..strokeWidth = 2
              ..style = PaintingStyle.stroke);
      }
    }
    return graph;
  }

  Widget _genGraphPage(BuildContext context) {
    final MyGraphDisplay graphDisplay = MyGraphDisplay(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text("Mesh Communication"),
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
        )
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
          return Container(
            color: Colors.red,
          );
        }
      },
    );
  }
}
