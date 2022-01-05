import 'dart:collection';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'dart:math' as math;
import 'package:graphview/GraphView.dart';
import 'package:meshcommunication/RequestHandler/request_handler.dart';
import 'package:meshcommunication/my_graph.dart';
import 'package:vector_math/vector_math.dart' as vm;

class MyLog extends StatefulWidget {

  MyLog({Key? key}): super(key: key);

  @override
  _MyLogDisplay createState() => _MyLogDisplay();

}

class _MyLogDisplay extends State<MyLog> {
  final List<Text> logs = <Text>[];

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Widget>(
      future: genLog(),
      builder: (context, response) {
        if (response.connectionState == ConnectionState.done) {
          Widget log = response.data!;
          return log;
        } else {
          // still loading
          return Container(color: Colors.white);
        }
      },
    );
  }

  Future<Widget> genLog() async {
    Map log = await MyGraph.of(context).requestHandler.log();
    print(log.entries);
    print(logs);
    print("before preety");
    String preetyLog = preetifyLog(log);
    print("after preety");
    logs.add(Text(preetyLog));
    print("I added some logs and will draw");
    print(logs);
    return ListView(children: logs);
  }


  String preetifyLog(Map log) {
    String ret = "";
    print(log.entries);
    for (var entry in log.entries) {
      for (String value in entry.value) {
        ret += entry.key.toString();
        ret += " - ";
        List<String> splitValue = value.split(":");
        ret += splitValue[0];
        if (splitValue[0] == "Received message" ||
            splitValue[0] == "Reached destination") {
          ret += " from ";
        } else if (splitValue[0] == "Relaying message" ||
            splitValue[0] == "Sent message" ||
            splitValue[0] == "Replying") {
          ret += " to ";
        }
        List<String> splitParameters = splitValue[1].split(",");
        ret += splitParameters[0];
        ret += " with content ";
        ret += splitParameters[1];
        ret += "\n";
      }
    }
    return ret;
  }
}
