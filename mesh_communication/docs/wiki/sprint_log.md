# Sprint 1

## Planning

- Generate manifest;
- Grid 3x3:
  - Nodes light up in the needed order;
    - Read all the necessary data from the manifest;
    - Know shelf order;
  - Orchestrator starts communication with pretended devices;
  - Communication by flood;

- In the case it's not possible to connect with a device, communicate to the orchestrator that the device crashed or is out of battery.

## Review

- Completed all planned issues;
- Finished orchestrator;
- Battery consumption;
  - Read parameters from configuration files;
  - Changed the initial plan of lights to screens;
- Communication between devices;
- Read and generate manifess;
- Started wiki:
  - Pipeline for documentation;
- Pipeline for tests:
  - Unit tests;
  - Mutation Tests;
- History of past builds in the pipeline (builds are archived);

### Changed details

- Communication protocol is proprietary;
- Devices do not have LEDs, but instead have screens;
- Nodes do not start communications, only orchestrator;

## Problems faced

- Made only one pull request for mutation test, instead of multiple pull requests;
  - Look at effort and make multiple pull requests for issues with higher effort;
- Bug fix and creating new features at the same time caused a bug hard to spot;
  - Regression tests (?);
- One person was making tests for a class being refactored by another, which created a merge conflict hard to solve;
  - Do not create any issue for test making, the person implementing the feature should do the tests before making pull requests;

## What to do next

- Front end;
  - With back end API;
- Loggers;
- Display manifests entries;

## Global Sprint 1 Retrospective

### Positive Topics

- Github Workflow;
- Weekly meetings with the client;
- Pipeline (DevOps);
- Responsibilities Segregation (Inside each team);
- Task Self-Atribuition

### Meh Topics

- Task Self-Atribuition;
- Test Coverage;
- Multiple discords for each team;
- Most talk happens inside the discord and not in github;
- Standard Communication;

### Topics to work on

- Try not to be so optimistic on the work estimates;
- Reserach before starting working with a tool;
- Analyze PBI's dependencies and redefine priorities ;
- Quality Assurance technic;
- More communication within each team;

# Sprint 2

## Planning

### Why is this sprint valuable

This sprint's focus is creating a GUI for the client to use.

### What can be done in this sprint

- See information in a standardized form;
- Log file;
- Responsive browser GUI (works for touch and desktop);
  - GUI should have a text log with identification of nodes;
  - Every device should display the ID;
  - Different devices should have different colors;
  - Display communication between devices;
  - If message is lost, a red cross should display on top of the message;
  - If message reached the destination correctly, a green check mark should be displayed;
  - Devices without battery should have a red cross on top;
- Make tick time system for GUI;
- Make a way to advance 10 ticks into the communication;



