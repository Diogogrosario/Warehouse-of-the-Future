Feature: Can I go to Simulation Tab
  Clicking the Simulation Tab should show me the metrics and devices information

    Scenario: Click the Simulation Tab
        Given I am on the Playground website
        When I click the Simulation Tab
        Then the current tab is set to Simulation