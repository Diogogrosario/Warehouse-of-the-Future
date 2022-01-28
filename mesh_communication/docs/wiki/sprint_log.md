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

## Review

- Frontend and backend divided into separate projects;
- Frontend integration with API;
- Time passage simulation (one or multiple ticks at the same time);
- Basic backend API done with log;
- Layout creation with devices;
- Orchestrator sends messages to product's devices;
- Bug fixing and race condition handeling;
- Documentation:
  - API endpoints;
  - Acceptance test draft;

### Changed Details

- Everything went according to plan.

## What to do next

- Continue working with backend and frontend interation;
- Finish issues involving the frontend;
- Redo ticks from the logfile, to make going back in time easier;
- Gherkin acceptance tests;
- Simulate node crashing and communication failure;

## Sprint 2 Retrospective

### Positive Topics

- Reopen some issues when continuing to work on that topic;
- Better task destribuition;

### Meh Topics

- Add done definition to some complex issues;
- Some people depend on the input of other people to advance;

### Topics to work on

- Read the documentation of the tool being used before implementing code;
- Frontend was dependent of the backend which delayed development;
- API's issue was not correctly handled (it was one big issue instead of many);
- API initial draft was not correct as there was no documentation to guide, leading to an incorrect interpretation of what the frontend needed;
- Wait for all reviewers to accept pull request before merging;

# Sprint 3

## Planning

### Why is this sprint valuable

In this sprint, the front end will continued to be worked on to provide more features to the client.

### What can be done in this sprint

- Finish API:
  - Error page;
- Display log file with button;
- Acceptance tests;
- Advance time automatically;
- Devices without battery are shown in the frontend;

## Review

- Front end:
  - Front page;
  - Passage of time was done to be automatic;
  - Log file is now displayed on the frontend;
  - Acceptance tests and the automation of these;
  - Bugfixes;
- API:
  - More tests were done to cover more edge cases;
  - Redo API specification;
  - Error page;
  - Default endpoint to show all rest API endpoints;
  - Message endpoints were separated;

### Changed details

- Changed license to MIT;
  - Be sure to check if any new library is not against the license;
- Front end may be discarded;

## Problems faced

- Many members did not work the minimum time during this sprint;
- After the merge, the sprint was not replanned;
- Other projects from different subjects impacted the development;
- (Potentially) Wasted a lot of time on the frontend;
- There was a problem with the sprint planning (did not expect another week to be added to the sprint);

## What to do next

- Collect data from the warehouse data vertical;
- Configuration must be changeable on the frontend and in runtime;
- Integrate our project with the frontend vertical;
- Change any hardcoded value;
- Make undo tick command;
- Failure detection and recovery;

## Sprint 3 Retrospective

### Positive Topics

- Issue creation and discussion improved;
- Well defined hierarchy on the project development;

### Meh Topics

- (Potentially) Wasted a lot of time on the frontend;
  - Needed to present an API to the client, whoever, our vertical was not about the frontend so it may be discarded in the final product;

- There was a problem with the sprint planning
  - Did not expect another week to be added to the sprint so it was not accounted for;


### Topics to work on

- Many members did not work the minimum time during this sprint;
- After the merge, the sprint was not replaned;
  - Should have made a meet with the team the each time the sprint backlog is made;

### The Bad Topics

- Other projects from different subjects impacted the development;
  - Too much workload from other subjects to fully dedicate the team's time to this project only;

# Sprint 4

## Planning

### Why is this sprint valuable

- After this sprint, the client will be able to fully customize the layout and other specification of the warehouse and see the results using different metrics. The integration with the front end will also be done during this sprint;

### What can be done in this sprint

- Metrics:
  - Energy consumed in each tick;
  - Energy consumed in a full communication;
  - How many failures happen in the system;
  - How many ticks the communication took;
- Configuration must be changeable on the frontend and in runtime (restart);
- Change any hardcoded value;
  - Hardcoded values are now part of the configuration file, such as: 
    - the device's range;
    - orchestrator range;
    - orchestrator ID;
    - messages' time to live;
    - liveness timeout;
- Make undo tick command (?);
  - Commands are not ready to undo themselves;
    - Messages are processed in a specific order which is not saved;
  - If a message failed and then undon, when being sent again, the message must fail again;
    - Can be obtained by a complete history of states the grid has went through, even after undoing a command;
- Failure detection and recovery;
- Integrate our project with the frontend vertical;
  - See if messages are being displayed correctly on their part;
  - Make API support for metric retreival and see if it is being displayed correctly;
  - Make API endpoint to change device's characteristics (difficult to complete on their part);
- Prepare project presentation;

### Sprint replanning

- API:
  - Submit new layouts;
    - Generate a random manifest with each layout;
  - Submit new configs (frontend might not have time to implement this on their part so we will not be able to implement);
- Make undo command (refer to original sprint planning);
- Random chance of message sending error;
- Make gifs for the final presentation;

### Sprint Review 

- Add parameterizable configs;

- Added metrics;

- Undo ticks;

- Device failure;

- Restart endpoint;

- Integrated with other teams;

- Updated docker;

- Updated API documentation;

  

## Whats next

- Add more metrics; 

- Failure detection;

- Integrate further with frontend;
- Config's default values should be implemented;

## Retrospective

### The good

- Sprint replaning was well done;
- Sprint estimations were well made;

### The meh

- Should have done more documentation about how to implement the backend on other vertical.

### Topics to work on

- Generating a random layout when running tests caused problems to other teams.
