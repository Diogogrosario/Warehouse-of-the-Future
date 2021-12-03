# Mesh Communication

## Description

The purpose of this vertical is to develop an application for simulating the behaviour of the devices used in the warehouse. Using this application, it is possible to generate warehouse manifests and simulate the devices' actions and communication, allowing for a simple visualization of the device mesh grid and custom configurations (such as failure rate of the devices and communication, battery capacities and energy consumptions).

```puml
@startuml

!theme amiga

hide empty members

object ManifestAPI

object MNAPI

object FrontEnd

package MeshNetwork{
    object Orchestrator
    object "Sensor" as S1
    object "Sensor" as S2
    object "Sensor" as S3
}

MNAPI <-up-> MeshNetwork
ManifestAPI -down-> Orchestrator : Sends Manifest Data
Orchestrator <-right-> S1
Orchestrator <-down-> S2
Orchestrator <-left-> S3

FrontEnd <-left-> MNAPI

@enduml
```

![domain_analysis](assets/domain_analysis.png)

## UML Class Diagram

```puml
@startuml class_diagram

!theme amiga

hide empty members

class ManifestEntry {
    componentID : Integer 
    position : Position 
    quantity: Integer
}

class Manifest {}

class Orchestrator {}

class MeshGrid {}

class Device {
    sendConsumption : Integer
    receiveConsumption : Integer
}

class Battery {
    capacity : Integer
    remaining : Integer
}
 
class Light {
    color : String
    consumption : Integer
}


ManifestEntry "1..*" --* Manifest
Manifest "*" --  "1" Orchestrator
Orchestrator "1" -- "1" MeshGrid : > sends commands
MeshGrid o-- "1..*" Device
Device "1" -- "*" Device : propagates commands
Battery --o Device
Light --o Device


@enduml
```

![UML Class Diagram](assets/UML_class.png)

 