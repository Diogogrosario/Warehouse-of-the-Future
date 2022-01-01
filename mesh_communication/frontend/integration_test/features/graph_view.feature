Feature: Graph
  The device graph that contains all devices of the network and represents
  the interactions between them.

  Scenario: Display devices
    Given that the device 1 is in the graph in the position 1, 1
    And that the device 2 is in the graph in the position 1, 2
    When I open the graph interface
    Then I should be able to see the device 1
    And I should be able to see the device 2
