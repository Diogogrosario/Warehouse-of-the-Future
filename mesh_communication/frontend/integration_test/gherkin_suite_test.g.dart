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
      'Graph:',
      <String>[],
      () {
        runScenario(
          'Display devices',
          <String>[],
          (TestDependencies dependencies) async {
            await runStep(
              'Given that the device 1 is in the graph in the position 1, 1',
              <String>[],
              null,
              dependencies,
            );

            await runStep(
              'And that the device 2 is in the graph in the position 1, 2',
              <String>[],
              null,
              dependencies,
            );

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

            await runStep(
              'And I should be able to see the device 2',
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

  void testFeature1() {
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
