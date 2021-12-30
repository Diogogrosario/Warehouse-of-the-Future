import 'package:flutter/cupertino.dart';
import 'package:flutter_gherkin/flutter_gherkin.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:gherkin/gherkin.dart';
import 'package:meshcommunication/MyGraphDisplay.dart';

final whenOpenInterface = when<FlutterWidgetTesterWorld>(
  'I open the graph interface',
      (context) async {
    await Future.delayed(const Duration(seconds: 1));
    final deviceFinder = find.byKey(const Key("Graph"));
    expect(deviceFinder, findsOneWidget);
  },
  configuration: StepDefinitionConfiguration()
    ..timeout = const Duration(minutes: 5),
);

final thenIExpectDevices = then1<int, FlutterWorld>(
  'I should be able to see the device {int}',
  (device_id, context) async {
    final deviceFinder = find.byKey(const Key("1"));
    context.expect(await context.world.appDriver.isPresent(deviceFinder), true);
  },

    configuration: StepDefinitionConfiguration()
  ..timeout = const Duration(minutes: 5),
);
