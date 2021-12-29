// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'gherkin_suite_test.dart';

// **************************************************************************
// GherkinSuiteTestGenerator
// **************************************************************************

class _CustomGherkinIntegrationTestRunner extends GherkinIntegrationTestRunner {
  _CustomGherkinIntegrationTestRunner(
    TestConfiguration configuration,
    Future<void> Function(World) appMainFunction,
  ) : super(configuration, appMainFunction);

  @override
  void onRun() {
    testFeature0();
  }

  void testFeature0() {
    runFeature(
      'Counter:',
      <String>[],
      () {
        runScenario(
          'Counter increases when the button is pressed',
          <String>[],
          (TestDependencies dependencies) async {
            await runStep(
              'Given I expect the "counter" to be "0"',
              <String>[],
              null,
              dependencies,
            );

            await runStep(
              'When I tap the "increment" button 10 times',
              <String>[],
              null,
              dependencies,
            );

            await runStep(
              'Then I expect the "counter" to be "0"',
              <String>[],
              null,
              dependencies,
            );
          },
          onBefore: () async => onBeforeRunFeature(
            'Counter',
            <String>[],
          ),
          onAfter: () async => onAfterRunFeature(
            'Counter',
          ),
        );
      },
    );
  }
}

void executeTestSuite(
  TestConfiguration configuration,
  Future<void> Function(World) appMainFunction,
) {
  _CustomGherkinIntegrationTestRunner(configuration, appMainFunction).run();
}
