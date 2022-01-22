import 'package:flutter/cupertino.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:gherkin/gherkin.dart';
import 'package:meshcommunication/RequestHandler/device.dart';
import 'package:meshcommunication/RequestHandler/request_handler_mock.dart';
import 'package:vector_math/vector_math.dart' as vm;

import '../world/custom_world.dart';

final givenDevice = given3<int, int, int, CustomWorld>(
  'that the device {int} is in the graph in the position {int}, {int}',
      (device_id, x, y, context) async {
    // Add the requested device to the request handler mock
    // Then the main in frontend will use all devices that are specified bellow
    RequestHandlerMock reqMock = context.world.requestHandler;
    vm.Vector3 position = vm.Vector3(x.toDouble(), y.toDouble(), 0);
    reqMock.addDevice(Device(id: device_id, pos: position));
  },
  configuration: StepDefinitionConfiguration()
    ..timeout = const Duration(minutes: 5),
);

final whenOpenInterface = when<CustomWorld>(
  'I open the graph interface',
      (context) async {
    // If we need to sleep uncomment
    // await Future.delayed(const Duration(seconds: 1));

    // Here we just want to open the graph interface, which will use the request
    // handler mock's information about devices to build the graph
    final startButtonFinder = find.byKey(const Key("startButton"));
    expect(context.world.rawAppDriver.any(startButtonFinder), true);

    // This is necessary to wait for the page to open, otherwise the tests will
    // be ahead of the application(it is async), and they will fail because no
    // device will be loaded at that time
    await context.world.rawAppDriver.tap(startButtonFinder);
    await context.world.rawAppDriver.pumpAndSettle();
  },
  configuration: StepDefinitionConfiguration()
    ..timeout = const Duration(minutes: 5),
);

final thenIExpectDevices = then1<int, CustomWorld>(
  'I should be able to see the device {int}',
  (device_id, context) async {
    // Just see if we can find a widget with the respective key :)
    final deviceFinder = find.byKey(Key(device_id.toString()));
    expect(context.world.rawAppDriver.any(deviceFinder), true);
  },
    configuration: StepDefinitionConfiguration()
  ..timeout = const Duration(minutes: 5),
);
