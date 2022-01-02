import 'package:gherkin/gherkin.dart';

import '../world/custom_world.dart';

final whenTapNTimesStep = when2<String, int, CustomWorld>(
  'I tap the {string} {int} times',
  (key, count, context) async {
    print("This is the whenTapNTimesStep test");
  },
  configuration: StepDefinitionConfiguration()
    ..timeout = const Duration(minutes: 5),
);

StepDefinitionGeneric ThenExpectTitleContent() {
  return then2(
    'I expect the {string} to be {string}',
        (widgetName, title, context) async {
        context.expectMatch("actual", "actual");
      // example code
    },
  );
}