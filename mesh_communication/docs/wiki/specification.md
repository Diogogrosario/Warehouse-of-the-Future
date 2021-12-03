# Specification

## Description

The purpose of this vertical is to develop an application for simulating the behaviour of the devices used in the warehouse. Using this application, it is possible to generate warehouse manifests and simulate the devices' actions and communication, allowing for a simple visualization of the device mesh grid and custom configurations (such as failure rate of the devices and communication, battery capacities and energy consumptions).

![domain_analysis](assets/domain_analysis.png)


## UML Class Diagram

![UML Class Diagram](assets/UML_class.png)

## MVP 

- Simple command line program to simulate the devices grid: 
  -  Input: 	
    - Devices battery
    - Devices usage
  -  Generate random manifests
- Show a 2D representation of the route and how the devices interact
- Main focus is the mesh device communication