Feature: Is fullscreen working
  Clicking the fullscreen button should toggle the fullscreen state

    Scenario: Click Warehouse Panel Fullscreen Button
        Given I am on the Playground website
        When I click the "warehouse-fullscreen-toggle" button
        Then the "info" view is collapsed

    Scenario: Click Info Panel Fullscreen Button
        Given I am on the Playground website
        When I click the "info-fullscreen-toggle" button
        Then the "warehouse" view is collapsed