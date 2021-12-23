import 'package:flutter/material.dart';
import 'package:graphview/GraphView.dart';
import 'package:http/http.dart' as http;
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

  Graph _genGraph(List<Device> devices) {
    Graph graph = UndirectedGraph();
    // gen nodes
    for (Device d in devices) {
      graph.addNode(Node.Id(d.id));
    }
    /*
    // gen edges
    // orchestrator
    Node node0 = graph.getNodeUsingId('0');
    graph.addEdge(node0, graph.getNodeUsingId('1'));
    graph.addEdge(node0, graph.getNodeUsingId('4'));
    // other
    for (int i = 1; i < graph.nodeCount() - 1; ++i) {
      Node node1 = graph.getNodeUsingId(i.toString());

      if (i % 3 != 0) {
        Node node2 = graph.getNodeUsingId((i + 1).toString());
        graph.addEdge(node1, node2);
      }

      if (i / 3.0 <= 2.0) {
        Node node3 = graph.getNodeUsingId((i + 3).toString());
        graph.addEdge(node1, node3);
      }
    }
     */
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
    Future<List<Device>> devices = requestHandler.getDevices();

    return FutureBuilder<List<Device>>(
      future: devices,
      builder: (context, response) {
        if (response.connectionState == ConnectionState.done) {
          Graph graph = _genGraph(response.data!);
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
