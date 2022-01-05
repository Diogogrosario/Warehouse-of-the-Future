Feature: Are Reports Expandable
  Clicking the Report Accordion should expand it and show all the relevant actions

    Scenario: Click any Report Accordion
        Given I am on the Playground website
        When I click a report
        Then the report expands and shows actions