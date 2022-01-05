import 'dart:collection';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'dart:math' as math;
import 'package:graphview/GraphView.dart';
import 'package:meshcommunication/RequestHandler/request_handler.dart';
import 'package:meshcommunication/my_graph.dart';
import 'package:vector_math/vector_math.dart' as vm;

class MyLog extends StatefulWidget {

  final List<Text> logs = <Text>[];
  VoidCallback? callback;

  MyLog({Key? key}): super(key: key);

  @override
  _MyLogDisplay createState() => _MyLogDisplay();

  Future<Widget> genLog(RequestHandler handler) async {
    Map log = await handler.log();
    String preetyLog = preetifyLog(log);
    if(preetyLog != "")
      logs.add(Text(preetyLog));
    return ListView(children: logs);
  }

  String preetifyLog(Map log) {
    String ret = "";
    for (var entry in log.entries) {
      for (String value in entry.value) {
        ret += entry.key.toString();
        ret += " - ";

        List<String> splitValue = value.split(":");
        ret += splitValue[0];
        splitValue[1] = splitValue.sublist(1).join(":");
        String stopWord = "";
        String secondStopWord = "msg=";

        List<String> splitParameters = splitValue[1].replaceAll(" ", "").split(",");

        if (splitValue[0] == "Received message" ||
            splitValue[0] == "Reached destination") {
          ret += " from ";

          stopWord = "source=";

        } else if (splitValue[0] == "Relaying message" ||
            splitValue[0] == "Sent message" ||
            splitValue[0] == "Replying") {
          ret += " to ";
          stopWord = "destination=";
        }

        int startIndex = splitParameters[0].indexOf(stopWord);
        int endIndex = splitParameters[0].indexOf("]");
        String deviceID = splitParameters[0].substring(startIndex + stopWord.length, endIndex);

        if(deviceID == "0"){
          ret += "Orchestrator ";
        }
        else{
          ret += "device ";
          ret += deviceID;
          ret += " ";
        }
        ret += "with content ";
        startIndex = splitParameters[1].indexOf(secondStopWord);
        endIndex = splitParameters[1].indexOf("]");
        ret += splitParameters[1].substring(startIndex + secondStopWord.length, endIndex);
        ret += "\n";

      }
    }
    return ret;
  }
}

class _MyLogDisplay extends State<MyLog> {
  @override
  void initState() {
    super.initState();


    widget.callback ??= updateLog;
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Widget>(
      future: widget.genLog(MyGraph.of(context).requestHandler),
      builder: (context, response) {
        if (response.connectionState == ConnectionState.done) {
          Widget log = response.data!;
          return log;
        } else {
          // still loading
          return Container();
        }
      },
    );
  }

  void updateLog()  {
    setState(() {

    });
  }

}
