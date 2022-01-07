import 'dart:collection';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:meshcommunication/RequestHandler/request_handler.dart';
import 'package:meshcommunication/my_graph.dart';

class MyLog extends StatefulWidget {
  final List<RichText> logs = <RichText>[];
  VoidCallback? callback;

  MyLog({Key? key}) : super(key: key);

  @override
  _MyLogDisplay createState() => _MyLogDisplay();

  Future<Widget> genLog(
    RequestHandler handler,
    HashMap<int, Color> nodeColors,
  ) async {
    Map log = await handler.log();
    String preetyLog = preetifyLog(log);
    if (preetyLog != "") {
      List<String> preetyLogSplit =
          preetyLog.substring(0, preetyLog.length - 1).split("\n");
      List<TextSpan> aux = <TextSpan>[];
      for (int i = 0; i < preetyLogSplit.length; i++) {
        String log = preetyLogSplit[i];
        String deviceID = log.split("-")[0].replaceAll(" ", "");
        int deviceIDInt = 0;

        if (deviceID != "Orchestrator") {
          int startIndex = 0;
          int endIndex = deviceID.length;

          deviceIDInt = int.parse(
              deviceID.substring(startIndex + deviceID.length - 1, endIndex));
        }
        Color color = nodeColors[deviceIDInt]!;

        List<String> splitLog = log.split("-");

        if(i < preetyLogSplit.length -1 ){
          splitLog[1] += "\n";
        }

        aux.add(TextSpan(
          text: splitLog[0],
          style: TextStyle(color: color),
          children: <TextSpan>[
            TextSpan(
                text: " - " + splitLog[1],
                style: const TextStyle(color: Colors.black)),
          ],
        ));
      }
      logs.add(RichText(
        text: TextSpan(
          text: "",
          children: aux,
        ),
      ));
    }

    //print(logs.toString());
    return ListView.separated(
      separatorBuilder: (BuildContext context, int index) => const Divider(),
      itemCount: logs.length,
      itemBuilder: (BuildContext context, int index) {
        return logs[index];
      },
    );

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

        List<String> splitParameters =
            splitValue[1].replaceAll(" ", "").split(",");

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
        String deviceID = splitParameters[0]
            .substring(startIndex + stopWord.length, endIndex);

        if (deviceID == "0") {
          ret += "Orchestrator ";
        } else {
          ret += "device ";
          ret += deviceID;
          ret += " ";
        }
        ret += "with content ";
        startIndex = splitParameters[1].indexOf(secondStopWord);
        endIndex = splitParameters[1].indexOf("]");
        ret += splitParameters[1]
            .substring(startIndex + secondStopWord.length, endIndex);
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
      future: widget.genLog(
          MyGraph.of(context).requestHandler, MyGraph.of(context).nodeColors),
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

  void updateLog() {
    setState(() {});
  }
}
