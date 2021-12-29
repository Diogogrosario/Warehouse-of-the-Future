import 'dart:async';
import 'package:flutter_gherkin/flutter_gherkin.dart';
import 'package:gherkin/gherkin.dart';
import 'hooks/hook.dart';
import 'steps/tap_button_n_times_step.dart';

Future<void> main() {
  final config = FlutterTestConfiguration()
    ..features = [RegExp('features/*.*.feature')]
    ..reporters = [
      ProgressReporter(),
      TestRunSummaryReporter(),
      JsonReporter(path: './report.json')
    ] // you can include the "StdoutReporter()" without the message level parameter for verbose log information
    ..hooks = [MyHook()]
    ..stepDefinitions = [TapButtonNTimesStep()]
    ..restartAppBetweenScenarios = true
    ..targetAppPath = 'test_driver/app.dart';
  //..targetAppWorkingDirectory = '../'

  return GherkinRunner().execute(config);
}
