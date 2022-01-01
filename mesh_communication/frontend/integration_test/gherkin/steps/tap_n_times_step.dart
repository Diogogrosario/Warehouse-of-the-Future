import 'package:flutter_gherkin/flutter_gherkin.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:gherkin/gherkin.dart';
import 'package:meshcommunication/RequestHandler/device.dart';

import '../world/custom_world.dart';

final whenTapNTimesStep = when2<String, int, CustomWorld>(
  'I tap the {string} {int} times',
  (key, count, context) async {
    print("This is the whenTapNTimesStep test");
    List<Device> devices = await context.world.requestHandler.getDevices();
    expect(0, devices.length);
  },
  configuration: StepDefinitionConfiguration()
    ..timeout = const Duration(minutes: 5),
);

final givenTitle = given2<String, String, CustomWorld>(
  'I expect the {string} to be {string}',
      (key, count, context) async {
    expect(1, 1);
  },
  configuration: StepDefinitionConfiguration()
    ..timeout = const Duration(minutes: 5),
);
