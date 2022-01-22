# https://cucumber.io/docs/gherkin/reference/
# https://pub.dev/packages/flutter_gherkin#getting-started
Feature: Title
  The title of the application (on the NavBar) should be Mesh Communication.

  Scenario: The application title is Mesh Communication after loading
    Given I expect the "appTitle" to be "Mesh Communication"
    When I tap the "appTitle" 10 times
    Then I expect the "appTitle" to be "Mesh Communication"
