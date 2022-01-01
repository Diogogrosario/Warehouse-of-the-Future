import 'package:flutter_gherkin/flutter_gherkin.dart';
import 'package:gherkin/gherkin.dart';
import 'package:meshcommunication/RequestHandler/request_handler.dart';
import 'package:meshcommunication/RequestHandler/request_handler_mock.dart';

import 'package:meshcommunication/main.dart' as app;
import 'hooks/myhook.dart';
import 'steps/tap_n_times_step.dart';
import 'world/custom_world.dart';

FlutterTestConfiguration gherkinTestConfiguration =
    FlutterTestConfiguration.DEFAULT(
  [
    whenTapNTimesStep,
    givenTitle,
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
      ]
      ..createWorld = (config) => Future.value(CustomWorld());

// ignore: prefer_function_declarations_over_variables
Future<void> Function(World) appInitializationFn = (World world) async {
  RequestHandler requestHandler = RequestHandlerMock();
  (world as CustomWorld).setRequestHandler(requestHandler);
  app.main(requestHandler: requestHandler);
};
