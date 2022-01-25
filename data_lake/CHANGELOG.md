# Data Lake Changelog

Every change in the Data Lake project is recorded in this file.

## Sprint 0 - 2021/10/21

---

#### **Added**
- Initial Architecture
- MVP definition
- Changelog file
- Frontend setup using **Docker**
- Flask setup using **Docker**

## Sprint 1 - 2021/11/26

---

#### **Added**
- Continuous Integration and Development Pipeline
- Manifest, Sensors, Staff, Cart, Layout and Stock endpoints

#### **Fixed**
- Lint errors

## Sprint 2 - 2021/12/10

---

#### **Added**
- Random data generator for manifests, staff, stock, sensor, cart and layouts
- MongoDB communication
- Endpoint interaction with MongoDB
- Worker to automatically and periodically populate the database

#### **Updated**
- Item's attributes
- Manifest and stock endpoints after MongoDB integration
- Data Generator to generate coherent data for all 3 super racks

#### **Fixed**
- Items in stock must have a designation
- Missing items in layout

## Sprint 3 - 2021/12/24

---

#### **Added**
- Data Generator to generate coherent data for items, manifests, staf, sensors
- Pipeline to authenticate to MongoDB
- API unit tests for Employees, GlobalData, Sensors, Buckets, Devices Staff, Shelves, Layout, Stock, Racks and Manifests
- Property Based Testing for Staff, GlobalData, Sensors and Layout
- Grafana implementation
- Dashboards displaying Staff, Cart, Shelves, Racks, Buckets, Stock, Devices, Layout, Sensors and Manifests

#### **Updated**
- Using items ids instead of the whole item in data generation
- Worker fully implemented, scheduling and terminating
- Generate data to use static items
- Project Documentation (README.md, Project Structure, API documentation)
- Worker name changed to Populate Worker

#### **Fixed**
- Pipeline mistakes
- Pipeline to run new tests
- Worker to use *http requests* to generate data
- Consistent JSON attributes in Manifests, Layout and Stock

#### **Removed**
- MongoDB container deployment
- Pipeline unuseful requirement
- Mongo and Mongo-Express images removed from docker-compose

## Sprint 4 - 2022/01/13

---

#### **Updated**
- Pipeline to include Grafana as well
- Backend Dockerfile
- Architecture documentation

#### **Fixed**
- Manifests and Layouts PBTs
- Error with root layouts and manifests route
- Populate Worker bug fixes

#### **Removed**
- Frontend build and deploy from Pipeline