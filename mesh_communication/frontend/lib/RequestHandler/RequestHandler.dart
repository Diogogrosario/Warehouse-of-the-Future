import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:myapp/RequestHandler/Device.dart';
import 'package:vector_math/vector_math.dart' as vm;

class RequestHandler {
  final String url;
  final http.Client client;

  RequestHandler(this.url) : client = http.Client();

  Uri _resourceUri([String resource = ""]) {
    return Uri.parse(url + "/" + resource);
  }

  Future<List<Device>> getDevices() async {
    http.Response fetchContent = await client.get(_resourceUri("devices/all"));
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
            id: d["device_id"],
            pos: vm.Vector3(d["position"]["x"], d["position"]["y"], 0.0),
          ),
        );
      }
    }

    return ret;
  }

  Future<List<int>> getEdges(String id) async {
    http.Response fetchContent =
        await client.get(_resourceUri("devices/inrange/" + id));
    List neighbors = jsonDecode(fetchContent.body);

    List<int> ret = <int>[];
    for (Map<String, dynamic> n in neighbors) {
      ret.add(n["device_id"]);
    }
    return ret;
  }
}
