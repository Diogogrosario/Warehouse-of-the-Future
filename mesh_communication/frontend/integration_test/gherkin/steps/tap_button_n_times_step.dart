import 'package:flutter_gherkin/flutter_gherkin.dart';
import 'package:gherkin/gherkin.dart';

final whenTapButtonNTimesStep = when2<String, int, FlutterWidgetTesterWorld>(
  'I tap the {string} button {int} times',
  (key, count, context) async {
    //final locator = find.byValueKey(key);
    //print("This is the whenTapButtonNTimesStep test");
  },
  configuration: StepDefinitionConfiguration()
    ..timeout = const Duration(minutes: 5),
);
