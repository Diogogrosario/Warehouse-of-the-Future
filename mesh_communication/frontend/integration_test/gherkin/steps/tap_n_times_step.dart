import 'package:flutter_gherkin/flutter_gherkin.dart';
import 'package:gherkin/gherkin.dart';

final whenTapNTimesStep = when2<String, int, FlutterWidgetTesterWorld>(
  'I tap the {string} {int} times',
  (key, count, context) async {
    print("This is the whenTapNTimesStep test");
  },
  configuration: StepDefinitionConfiguration()
    ..timeout = const Duration(minutes: 5),
);
