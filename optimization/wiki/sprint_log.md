## Sprint 0

Sprint 0 represented the kickoff of the DS course. During it, we formed our group and made several class meetings with the client to get an initial vision of the problem and how we could insert ourselves in it in order to manage a solution.

Unlike other groups, non of the members knew each other. Sprint 0 forced to an extra social meeting in order to ice break the environment inside the groups


### Planning

* Group formation.

* Define a communication strategy.

* Definition of the roles of PO and SM.

* Definition of our project vertical.

* Social meeting. To everybody know each other.

* Explore and execute the tasks required for evaluation in this sprint in the course dashboard.


### Review

* We were able to know each other better. Everyone was friendly to the idea that was required to share additional empathy towards other group members at the kickoff.

* Definition of our vertical, an optimization task.

* Election of one PO and one SM.

* We were able to access all materials and technologies that were mandatory (GitHub and docker).

* Consulted the dashboard and defined the following wiki items:    
    * [Product Vistion](1-vision.md)
    * [Domain Analysis](2-domain-analysis.md)
    * [Architecture](3-architecture.md)
    * [Risks](4-risks.md)
    * [Market Search](5-market_search.md)
    * [Git Workflow](6-git_workflow.md)

* Gather feedback from previous year students of the course, to better understand what can easily go wrong.


### What to do Next

* Load a Docker environment

* Divide the members into sub-teams


### Retrospective

#### Positive Topics

* All issues were
* The group was motivated as well as all the class.
* The mindset within the class was good.
* Relevant questions were made to the client since the kickoff to easily obtain the information required to start coding.

#### Meh Topics

* Our group didn't know each other before. There weren't work mechanics previously existent like in other groups.

#### Topics to work on

* The client had very imprecise information. More questions were required.
* Neither PO nor SM had past experience in working on that task. It was required further exploration of what should its job be.
* Work dedication was very unbalanced. Better distribution was required.


## Sprint 1

### Planning

* Setup of a Docker environment.
* Definition of a Github workflow. 
* Definition of mockups of the layouts we were required.
* Generation of mock database that could support the genetic algorithm needs to execute its job.
* Generation of the first mock data elements.
* Execution of the first metric in the genetic algorithm: weight.


### Review

* We defined together with the rest of the class students a [git work flow](6-git_workflow)
* We set up the first version of the docker environment that allowed members to start their coding working.
* We were able to define the first version of a database supporting the model required in our vertical.
* Weight metric was created.
* A first mock warehouse was generated allowing the execution of the genetic algorithm.
* Boot a web pipeline.


### What to do Next

* Data that could support new metrics.
* Testing the results of the logic side in realistic scenarios.
* Be able to execute the genetic algorithm that runs in python from the user-friendly web frontend.
* Capability of watching the results output in the frontend, at the moment their our only shell prints.

### Retrospective

#### Positive Topics

* A first version of the genetic algorithm with a satisfactory result was achieved

* Motivation remained high within the group and class.


#### Meh Topics

* The overlap between groups dilemma started to show up.

* Web site development issues were ambiguous and progression was slow. The task of visualization shouldn't be our responsibility, but it wasn't ready any sort of visualization that could be integrated from team 3.

* Using Docker development wasn't easy to implement at 100%.


#### Topics to work on

* Mockups revealed useless since there was no time to separate the tasks of layout designing and code.
* Unit Testing of the many components of our project.
* Better communication between groups.

### What to do Next
* Connect the front end with the optimization service.
* Integrate unit testing in several components.
* Create more mock data to support genetic development.



## Sprint 2

### Planning

* Use gRPC to connect frontend to genetic algorithm.
* Finish result web representation.
* Create mock data to support metrics of Time-Space Optimization, insert a frequency field to the database. 
* Design optimization metrics to work, Time/Space Optimization.


### Retrospective

* Successfully integration of wor.
* Mock data was generated to support the execution of this metric. 
* gRPC was a complete waste of time. It is a very complex library for a simple task to perform.
* Hardcoded visualization with placeholders working.


#### Positive Topics

* Another metric emerged in the system.

#### Meh Topics

* Time/Space optimization was not achieved in this sprint.
* There wasn't time to implement unit testing.
* There was an unbalance load of work between the genetic developers' team and other teams

#### Topics to work on

* Connect Frontend with genetic algorithm
* Better working balance among teams.
* Integrated unit testing.
* Finish a simple but efficient frontend layout.

### What to do Next

* Finish MVP metrics.
* Connect frontend with genetic algorithm service.
* Finish frontend layout.

## Sprint 3

This sprint compressed the Christmas holidays period, for that reason it was more productive than the other 4 sprints.

### Planning

* Connect Frontend with Genetic algorithm in a microservice philosophy.
* Finish the visualization in the web frontend.
* Finished the layout to use on the web team.
* Implement a login system following a self-containing philosophy
* Implemented Time/Space and minimize error metric.

### Retrospective

* The conversion of the genetic algorithm towards a microservice was achieved.
* Web received a huge boost, communication with the microservice, login and visualization were completed.
* Time/Space and Minimizing error metrics were finished as well as mock data to support it.


#### Positive Topics

* All MVP metrics completed isolated.
* It is for the first time possible to trigger the genetic algorithm from the front end.


#### Meh Topics

* Metrics don't work properly together.
* There are metrics that should never run together since they cancel themselves.
* The integration with group 1 should already be in progress, but lack of time denied that step.


#### Topics to work on

* Better workload among dev teams.
* Integration and communication with Data Lake team
* Metrics should work together.

### What to do Next

* Make sure metrics work together, normalize them.
* Integrate with other groups within the class.

## Sprint 4

This sprint was the last one. The focus was on finishing the issues that were left open. Integration, testing and bug fixing was the main concern.

### Planning

* Feed the genetic algorithm with products from Data Lake.
* Adapt our output to the elements offered by the Data Lake team.
* Normalize all metrics in order to be possible to combine them.
* Deny in the front end the possibility to execute mutual exclusive metrics.
* Unit testing genetic algorithm.

### Retrospective

#### Positive Topics

* It is impossible to combine antagonist metrics.
* Genetic algorithm works properly with multiple metrics.
* Input data integrated with group 1.

#### Meh Topics

* Unit testing was not possible due to time.

* Group 1 didn't offer a POST route to deploy our layouts.

* It wasn't timely feasible to integrate the output of our layouts into the data lake.