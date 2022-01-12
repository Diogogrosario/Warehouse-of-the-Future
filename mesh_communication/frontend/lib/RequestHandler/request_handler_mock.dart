import 'package:meshcommunication/RequestHandler/device.dart';
import 'package:meshcommunication/RequestHandler/request_handler.dart';

class RequestHandlerMock implements RequestHandler {
  List<Device> devices = <Device>[];
  Map<int, List<int>> neighbors = {};

  void addDevice(Device device) {
    devices.add(device);
  }

  @override
  Future<List<Device>> getDevices() {
    return Future.value(devices);
  }

  @override
  Future<List<int>> getNeighbors(String id) {
    // device has no neighbors or isn't in the device list of something
    if (!neighbors.containsKey(id)) {
      return Future.value([]);
    }

    return Future.value(neighbors[id]);
  }

  @override
  Future<void> advanceTick({int n = 1}) async {
    // can have some logic
  }

  @override
  Future<Map> getRecvMsgs() {
    // TODO mock some messages
    return Future.value({});
  }

  @override
  Future<Map> getSendMsgs() {
    // TODO mock some messages
    return Future.value({});
  }

  @override
  Future<void> orchestrate() async {
    // can have some logic
  }

  @override
  Future<Map> log() {
    // TODO: implement log
    return Future.value({});
  }
}
