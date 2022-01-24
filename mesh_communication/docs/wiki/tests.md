# Tests

## Acceptance tests

### Graph Visualization

**Given** a system that has a set of devices,
**When** I open the system's graph interface,  
**Then** I should be able to visualize the devices.

### Log Interface

**Given** a system that has a set of devices **and**
**Given** a communcation that will be finished in _N_ ticks,
**When** I open the log interface **and**
**When** I skip _N_ ticks,
**Then** I should be able to visualize the all log messages that the communcation produced.

### Display message redirection

**Given** a system that has a set of devices: _A_ and _B_ **and**
**Given** that device _A_ that will redirect a message to device _B_ in the next tick,
**When** I skip _1_ ticks,
**Then** I should verify that the edge connecting _A_ and _B_ is colored in green.

### Pausing the system

**Given** a system that has a set of devices **and**
**Given** that the system is in a paused state,
**Then** no ticks shall pass.

### Automatic time flow

**Given** a system that has a set of devices **and**
**Given** that the system is in a paused state,
**When** I click on the play button,
**Then** the system's ticks should advance automatically.

### Device out of battery

**Given** a system that has a set of devices: _A_ **and**
**Given** that device _A_ will run out of battery in the next tick,  
**When** I skip _1_ tick,
**Then** I should see device _A_ turned off.

### Message failure

**Given** a system that has a set of devices: _A_ and _B_ **and**
**Given** a device _A_ that will fail send a message to device _B_ in the next tick,
**When** I skip _1_ tick,
**Then** I should verify that the edge connecting A and B has a red cross.

### Go backwards in time

**Given** a system that has a set of devices **and**
**Given** a communcation that will be finished in _N_ ticks,
**When** I skip _N-1_ ticks **and**
**When** I click on the undo button,
**Then** I should be able to visualize the system as it was in tick _N-1_.

### Metric visualization of a tick

**Given** a system that has a set of devices,
**When** I skip _1_ tick,
**Then** I should be able to visualize the energy consumption of the elapsed tick **and**
I should be able to visualize how many failures happened during the elapsed tick.

### Metric visualization of a communcation

**Given** a system that has a set of devices **and**
**Given** a communcation that will be finished in _N_ ticks,
**When** I skip _N_ ticks,
**Then** I should be able to visualize the total energy consumption of the communication **and**
I should be able to visualize how many ticks elapsed since the start of the communication.

### System parameterization

**Given** a system that has a set of devices **and**
**Given** a communcation that will be finished in _N_ ticks,
**When** I specify a battery range _R_ that all devices must use **and**
**When** I skip _N_ ticks,
**Then** I should be able to visualize that all messages sent are in accordance with the range _R_.
