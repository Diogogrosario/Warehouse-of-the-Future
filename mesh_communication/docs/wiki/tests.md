# Tests

## Acceptance tests

### Graph Visualization

**Given** a layout file with a set of devices,  
**When** I open the system's graph interface,  
**Then** I should be able to visualize the devices as they were defined in the layout file.

### Log Interface

**When** I open the log interface after a number of ticks,  
**Then** I should see all logs that refer to ticks that have occurred.

### Display message redirection

**Given** a system that has a pending message that will be redirected,  
**When** I click on the advance tick button,  
**Then** I should be able to visualize the message being redirected to other devices.

### Pausing the system

**When** I click on the pause button and if I do not make any further interactions with the UI,  
**Then** the interface must remain the same indefinitely.

### Automatic time flow

**When** I open the system's graph interface and if I do not interact with the time flow buttons,  
**Then** the system's ticks should advance automatically.

### Device out of battery

**Given** a device that has ran out of battery,  
**When** I open the graph interface,  
**Then** I should see that the device turned off.

## Possible property (use on PBT if we implement it)

**Given** any system state,  
if it advances N ticks followed by going back N ticks,  
**Then** the system's state must remain the same.
