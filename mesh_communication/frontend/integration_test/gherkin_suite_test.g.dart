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
      'Title:',
      <String>[],
      () {
        runScenario(
          'The application title is Mesh Communication after loading',
          <String>[],
          (TestDependencies dependencies) async {
            await runStep(
              'Given I expect the "appTitle" to be "Mesh Communication"',
              <String>[],
              null,
              dependencies,
            );

            await runStep(
              'When I tap the "appTitle" 10 times',
              <String>[],
              null,
              dependencies,
            );

            await runStep(
              'Then I expect the "appTitle" to be "Mesh Communication"',
              <String>[],
              null,
              dependencies,
            );
          },
          onBefore: () async => onBeforeRunFeature(
            'Title',
            <String>[],
          ),
          onAfter: () async => onAfterRunFeature(
            'Title',
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
