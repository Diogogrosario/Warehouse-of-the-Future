import 'package:flutter_gherkin/flutter_gherkin.dart';
import 'package:gherkin/gherkin.dart';

import 'package:meshcommunication/main.dart' as app;
import 'hooks/myhook.dart';
import 'steps/tap_n_times_step.dart';

FlutterTestConfiguration gherkinTestConfiguration =
    FlutterTestConfiguration.DEFAULT(
  [
    whenTapNTimesStep,
  ],
)
      ..hooks = [
        MyHook(),
      ]
      ..reporters = [
        StdoutReporter(MessageLevel.error)
          ..setWriteLineFn(print)
          ..setWriteFn(print),
        ProgressReporter()
          ..setWriteLineFn(print)
          ..setWriteFn(print),
        TestRunSummaryReporter()
          ..setWriteLineFn(print)
          ..setWriteFn(print),
        JsonReporter(
          writeReport: (_, __) => Future<void>.value(),
        ),
      ];

// ignore: prefer_function_declarations_over_variables
Future<void> Function(World) appInitializationFn = (World world) async {
  // ensure a new injector instance is created each time
  app.main();
};
