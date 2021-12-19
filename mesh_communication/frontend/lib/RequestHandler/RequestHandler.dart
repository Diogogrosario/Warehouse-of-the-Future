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
    // TODO this is a fake request
    http.Response fetchContent = await client.get(_resourceUri());

    List<Device> ret = <Device>[];
    ret.add(Device(id: '0', pos: vm.Vector3(0.0, 0.0, 0.0)));
    for (int i = 0; i < 9; i++) {
      ret.add(
        Device(
          id: (i + 1).toString(),
          pos: vm.Vector3(i / 3, i % 3, 0.0),
        ),
      );
    }
    return ret;
  }
}
