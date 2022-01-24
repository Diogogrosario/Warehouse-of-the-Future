# Tests

## Testing

### Backend

The backend is tested using Unit-tests and Mutation tests.

- Unit-tests -- Run by calling `mvn test` inside the
  [backend directory](/mesh_communication/backend). The results and statistics
  are shown on screen;
- Mutation tests -- Run by calling
  `mvn org.pitest:pitest-maven:mutationCoverage` inside the
  [backend directory](/mesh_communication/backend). The results and statistics
  are then available inside the generated `target/pit-reports` directory in HTML
  format (`index.html`).

### Frontend

The frontend is tested using acceptance tests, using
[Flutter gherkin](https://github.com/jonsamwell/flutter_gherkin). We're using
the experimental backend
[integration test](https://docs.flutter.dev/testing/integration-tests), instead
of the old widget driver. Since we are using flutter web, there is no need for
an android emulator in our project. As such, we use
[chrome-driver](https://chromedriver.chromium.org/downloads) to run the
integration tests in a web server. When the definitive version of the
[integration test](https://docs.flutter.dev/testing/integration-tests) backend
is released, it is necessary to update it.

To run the acceptance tests the following has to be done:

- start **chromedriver** (comes with chrome/chromium) on port 4444:
  `chromedriver --port=4444`
- run the tests with following:

```sh
# generate test suite
flutter pub run build_runner clean
flutter pub run build_runner build --delete-conflicting-outputs

# run the tests
flutter drive --driver=test_driver/integration_test_driver.dart --target=integration_test/gherkin_suite_test.dart -d web-server
```

## Acceptance tests

### Graph Visualization

**Given** a layout file with a set of devices,  
**When** I open the system's graph interface,  
**Then** I should be able to visualize the devices as they were defined in the
layout file.

### Log Interface

**When** I open the log interface after a number of ticks,  
**Then** I should see all logs that refer to ticks that have occurred.

### Display message redirection

**Given** a system that has a pending message that will be redirected,  
**When** I click on the advance tick button,  
**Then** I should be able to visualize the message being redirected to other
devices.

### Pausing the system

**When** I click on the pause button and if I do not make any further
interactions with the UI,  
**Then** the interface must remain the same indefinitely.

### Automatic time flow

**When** I open the system's graph interface and if I do not interact with the
time flow buttons,  
**Then** the system's ticks should advance automatically.

### Device out of battery

**Given** a device that has ran out of battery,  
**When** I open the graph interface,  
**Then** I should see that the device turned off.

## Possible property (use on PBT if we implement it)

**Given** any system state,  
if it advances N ticks followed by going back N ticks,  
**Then** the system's state must remain the same.
