import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:meshcommunication/RequestHandler/device.dart';
import 'package:vector_math/vector_math.dart' as vm;

class RequestHandler {
  final String _url;
  final http.Client _client;

  RequestHandler(this._url) : _client = http.Client();

  Uri _resourceUri([String resource = ""]) {
    return Uri.parse(_url + "/" + resource);
  }

  Future<List<Device>> getDevices() async {
    http.Response fetchContent = await _client.get(_resourceUri("devices/all"));
    List devices = jsonDecode(fetchContent.body);

    List<Device> ret = <Device>[];
    for (Map<String, dynamic> d in devices) {
      if (d.containsKey("orchestrator") && d["orchestrator"]) {
        // TODO don't hard-code the id
        // orchestrator
        ret.add(
          Device(
            id: 0,
            pos: vm.Vector3(d["position"]["x"], d["position"]["y"], 0.0),
          ),
        );
      } else {
        // normal device
        ret.add(
          Device(
            id: d["id"],
            pos: vm.Vector3(d["position"]["x"], d["position"]["y"], 0.0),
          ),
        );
      }
    }

    return ret;
  }

  Future<List<int>> getNeighbors(String id) async {
    http.Response fetchContent =
        await _client.get(_resourceUri("devices/inrange/" + id));
    List neighbors = jsonDecode(fetchContent.body);

    List<int> ret = <int>[];
    for (Map<String, dynamic> n in neighbors) {
      ret.add(n["id"]);
    }
    return ret;
  }

  Future<void> advanceTick({int n = 1}) async {
    _client.post(_resourceUri("tick/forwards/?n_ticks=" + n.toString()));
  }

  Future<Map> getRecvMsgs() async {
    http.Response fetchContent =
        await _client.get(_resourceUri("messages/receive"));
    return jsonDecode(fetchContent.body);
  }

  Future<Map> getSendMsgs() async {
    http.Response fetchContent =
        await _client.get(_resourceUri("messages/send"));
    return jsonDecode(fetchContent.body);
  }

  Future<void> orchestrate() async {
    http.Response response = await _client.post(_resourceUri("orchestrate"));
    if (kDebugMode) {
      print(response.body);
    }
  }

  Future<Map> log() async {
    http.Response fetchContent = await _client.get(_resourceUri("log"));
    return jsonDecode(fetchContent.body);
  }
}
