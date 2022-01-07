import 'package:flutter/material.dart';
import 'package:graphview/GraphView.dart';
import 'package:meshcommunication/ActionButtons/action_button.dart';
import 'package:meshcommunication/ActionButtons/ff_button.dart';
import 'package:meshcommunication/ActionButtons/pp_button.dart';
import 'package:meshcommunication/ActionButtons/sb_button.dart';
import 'package:meshcommunication/ActionButtons/sf_button.dart';
import 'package:meshcommunication/RequestHandler/device.dart';
import 'package:meshcommunication/RequestHandler/request_handler.dart';
import 'package:meshcommunication/my_graph.dart';
import 'package:meshcommunication/my_graph_display.dart';
import 'package:meshcommunication/undirected_graph.dart';

class MeshCommunication extends StatelessWidget {
  static const String url = "http://localhost:8080";
  late RequestHandler requestHandler;

  MeshCommunication({RequestHandler? requestHandler, Key? key})
      : requestHandler = RequestHandler(MeshCommunication.url),
        super(key: key) {
    if (requestHandler != null) {
      this.requestHandler = requestHandler;
    }
  }

  void _startSimulation(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => BasePage(requestHandler: requestHandler),
      ),
    );
  }

  Widget _titleScreen(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const Text(
            "Mesh Communication",
            key: Key("startAppTitle"),
            style: TextStyle(
              color: Colors.blue,
              fontWeight: FontWeight.bold,
              fontSize: 25,
            ),
          ),
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.1,
          ),
          ActionButton(
            () {
              _startSimulation(context);
            },
            "Start simulation",
            const Icon(Icons.play_circle_fill_rounded),
            key: const Key("startButton"),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: Builder(
          builder: (BuildContext innerContext) {
            return _titleScreen(innerContext);
          },
        ),
      ),
    );
  }
}

class BasePage extends StatelessWidget {
  final RequestHandler requestHandler;

  const BasePage({required this.requestHandler, Key? key}) : super(key: key);

  Widget _pageSkeleton(
      {List<Widget>? actions, Widget? body, List<Widget>? footers}) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Mesh Communication",
          key: Key("appTitle"),
        ),
        actions: actions,
      ),
      body: body,
      persistentFooterButtons: footers,
    );
  }

  Widget _genGraphPage(BuildContext context) {
    final MyGraphDisplay graphDisplay = MyGraphDisplay(context);
    return _pageSkeleton(
      actions: [
        SBButton(MyGraph.of(context).skipBackwards),
        PPButton(MyGraph.of(context).pausePlay),
        SFButton(MyGraph.of(context).skipForward),
        FFButton(MyGraph.of(context).fastForward),
      ],
      body: graphDisplay,
      footers: [
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

  Future<Graph> _genGraph(RequestHandler requestHandler) async {
    Graph graph = UndirectedGraph();

    // gen nodes
    List<Device> devices = <Device>[];
    try {
      devices = await requestHandler.getDevices();
    } on TypeError {
      return graph;
    }

    for (Device d in devices) {
      Node newNode = Node.Id(d.id);
      //newNode.size = const Size(20.0, 30.0);
      //newNode.position = const Offset(0.0, -30.0);
      graph.addNode(newNode);
    }
    // gen edges
    for (Device d in devices) {
      // TODO could be optimized by using a single request
      List<int> neighbors = await requestHandler.getNeighbors(d.id.toString());
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

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Graph>(
      future: _genGraph(requestHandler),
      builder: (context, response) {
        if (response.connectionState == ConnectionState.done) {
          if (response.data != null) {
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
            return _pageSkeleton(
              actions: const [
                SBButton(null),
                PPButton(null),
                SFButton(null),
                FFButton(null),
              ],
              body: const Center(
                child: Text(
                  'Backend not Initialized!',
                  style: TextStyle(
                    color: Colors.red,
                    fontSize: 40,
                  ),
                ),
              ),
              footers: const [
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
        } else {
          // still loading
          return _pageSkeleton(
            actions: const [
              SBButton(null),
              PPButton(null),
              SFButton(null),
              FFButton(null),
            ],
            footers: const [
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
