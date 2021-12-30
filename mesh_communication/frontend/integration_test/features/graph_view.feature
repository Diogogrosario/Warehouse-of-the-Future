Feature: Graph
  The device graph that contains all devices of the network and represents
  the interactions between them.

  Scenario: Display devices
    When I open the graph interface
    Then I should be able to see the device 1
