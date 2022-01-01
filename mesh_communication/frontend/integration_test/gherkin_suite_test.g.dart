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
    testFeature1();
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
              'Given I expect the "appTitle1" to be "Mesh Communication"',
              <String>[],
              null,
              dependencies,
            );

            await runStep(
              'When I tap the "appTitle2" 10 times',
              <String>[],
              null,
              dependencies,
            );

            await runStep(
              'Then I expect the "appTitle3" to be "Mesh Communication"',
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

  void testFeature1() {
    runFeature(
      'Graph:',
      <String>[],
      () {
        runScenario(
          'Display devices',
          <String>[],
          (TestDependencies dependencies) async {
            await runStep(
              'When I open the graph interface',
              <String>[],
              null,
              dependencies,
            );

            await runStep(
              'Then I should be able to see the device 1',
              <String>[],
              null,
              dependencies,
            );
          },
          onBefore: () async => onBeforeRunFeature(
            'Graph',
            <String>[],
          ),
          onAfter: () async => onAfterRunFeature(
            'Graph',
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
