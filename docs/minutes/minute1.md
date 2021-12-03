# Ata 1 - 2021-11-5

# Ditigal twin do warehouse

No limit set on development technologies, except:
    - Node.js simulator (existing code)

## Simulator
- Data Simulator (Which ones)
- Number of Shelves
- Switch on and off hardware
- Import layouts from CAD files
    - What type are CAD files?
- Each shelf has a sensor to detect things
- Predictive models:
    - Predict failures, especially hardware, type of batery, etc
- Optimize the warehouse layout according to the manifests to keep the parts that are taken at the same time close to each other (keeping in mind the weigt of the parts aswell)
    - If shelves are equal -> focus in vertical optimization
- Chaos engineering: Force failures to see how the system behaves
- Possible optmizations:
    - Place solar pannels in shelves that are more frequently used (better battery life)
- Components to simulate:
    - Sensor, LED, battery
    - They have a microprocessor that controls all of this
    - Communication protocol with hardware is 868

The manifests come in one month in advance
    - What's the frequency of manifest arrival? Once a day, week or month? To be defined by the client

Hardaware was supposed to arrive in October but is late
    - We can use breadboards to physically simulate the components

The software team is using a software mesh, so that all the components are aware of each other

We still don't know which data is provided by the manifests

The compartments have very distinct sizes (see screw and car bumper):
    - The client what's the range in shelf sizes
    - Parts weight? Heavy parts must be more accessible thant the light ones (easier workload)

How to deal with quantity verification for each part:
    - Client and warehouse don't know what to do
    - Not our problem

Normaly there is only one cart at a time:
    - Chaos engineering will be fun

How to proceed when the worker picks the wrong part?
    - Change LED color? Still open

Big focus on user friendly produt

## Questions for the client

- Number of manifests and their frequency (daily, weekly or monthly)
- What are the types of pieces, shelf ranges (if they're the same or not)
- Simultaneous restock of parts by workers
- Hardware and software protocols by the warehouse
- Battery capacity and average energy consumption
- Type of LED: standalone, led array, white, black, RGB, display

## Communicating with the client

- Mondays, Wednesdays and Fridays
- Tuesdays e Thursdays are out of question
- Appoint every meeting with 1 week's notice to garantee favourable timetables
- fbarros@fe.up.pt

# Tips from Sereno

- There are pictures of the warehouse
    - The carts run on tracks (fixed route)
- João Costa has access to manifests from similar companies (will provide examples)
- Know how many times the warehouse layout changes, how much time it takes (among others)
- There must be a connection between the current layout of the warehouse and where the parts are located (like in manifests or in the systems)
- Define terminology in use:
    - UML for memes or markdown tables