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

- **Given** a system that has a set of devices,
- **When** I open the system's graph interface,
- **Then** I should be able to visualize the devices.

### Log Interface

- **Given** a system that has a set of devices **and**
- **Given** a communcation that will be finished in _N_ ticks,
- **When** I open the log interface **and**
- **When** I skip _N_ ticks,
- **Then** I should be able to visualize the all log messages that the
  communcation produced.

### Display message redirection

- **Given** a system that has a set of devices: _A_ and _B_ **and**
- **Given** that device _A_ that will redirect a message to device _B_ in the
  next tick,
- **When** I skip _1_ ticks,
- **Then** I should verify that the edge connecting _A_ and _B_ is colored in
  green.

### Pausing the system

- **Given** a system that has a set of devices **and**
- **Given** that the system is in a paused state,
- **Then** no ticks shall pass.

### Automatic time flow

- **Given** a system that has a set of devices **and**
- **Given** that the system is in a paused state,
- **When** I click on the play button,
- **Then** the system's ticks should advance automatically.

### Device out of battery

- **Given** a system that has a set of devices: _A_ **and**
- **Given** that device _A_ will run out of battery in the next tick,
- **When** I skip _1_ tick,
- **Then** I should see device _A_ turned off.

### Message failure

- **Given** a system that has a set of devices: _A_ and _B_ **and**
- **Given** a device _A_ that will fail send a message to device _B_ in the next
  tick,
- **When** I skip _1_ tick,
- **Then** I should verify that the edge connecting A and B has a red cross.

### Go backwards in time

- **Given** a system that has a set of devices **and**
- **Given** a communcation that will be finished in _N_ ticks,
- **When** I skip _N-1_ ticks **and**
- **When** I click on the undo button,
- **Then** I should be able to visualize the system as it was in tick _N-1_.

### Metric visualization of a tick

- **Given** a system that has a set of devices,
- **When** I skip _1_ tick,
- **Then** I should be able to visualize the energy consumption of the elapsed
  tick **and** I should be able to visualize how many failures happened during
  the elapsed tick.

### Metric visualization of a communcation

- **Given** a system that has a set of devices **and**
- **Given** a communcation that will be finished in _N_ ticks,
- **When** I skip _N_ ticks,
- **Then** I should be able to visualize the total energy consumption of the
  communication **and** I should be able to visualize how many ticks elapsed
  since the start of the communication.

### System parameterization

- **Given** a system that has a set of devices **and**
- **Given** a communcation that will be finished in _N_ ticks,
- **When** I specify a battery range _R_ that all devices must use **and**
- **When** I skip _N_ ticks,
- **Then** I should be able to visualize that all messages sent are in
  accordance with the range _R_.
