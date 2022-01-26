# Data Lake Changelog

Every change made to the Data Lake project is recorded in this file.

## Sprint 0 - 2021/10/21

---

#### **Added**
- Domain Analysis
- Initial Architecture
- MVP definition
- `Changelog` file
- Frontend setup using [Docker](https://www.docker.com)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/) setup using [Docker](https://www.docker.com)
- Acceptance tests to the Product Backlog Items

## Sprint 1 - 2021/11/26

---

#### **Added**
- Continuous Integration and Development Pipeline
- *Manifest*, *Sensors*, *Staff*, *Cart*, *Layout* and *Stock* endpoints
- Configure [Flask](https://flask.palletsprojects.com/en/2.0.x/) to work with [Swagger](https://swagger.io)
- Define Data format
- Database creation using [MongoDB](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_emea_portugal_search_core_brand_atlas_desktop&utm_term=mongodbatlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624551&adgroup=115749716583&gclid=CjwKCAiA3L6PBhBvEiwAINlJ9H-Yu1PbWeba9bpFlmqBpS66frYq_P6QA2E8SHANyuZdEiM3GrGWIRoCXTsQAvD_BwE)

#### **Fixed**
- Lint errors

## Sprint 2 - 2021/12/10

---

#### **Added**
- Random data generator for *Manifests*, *Staff*, *Stock*, *Sensor*, *Cart* and *Layouts*
- [MongoDB](https://www.mongodb.com) communication
- Endpoint interaction with [MongoDB](https://www.mongodb.com)
- Worker to automatically and periodically populate the database
- Frontend design mockups

#### **Updated**
- Item's attributes
- *Manifest* and *Stock* endpoints after [MongoDB](https://www.mongodb.com) integration
- Data Generator to generate coherent data for all 3 super racks

#### **Fixed**
- Items in *Stock* must have a designation
- Missing items in *Layout*

## Sprint 3 - 2021/12/24

---

#### **Added**
- Data Generator to generate coherent data for *Items*, *Manifests*, *Staff*, *Sensors*
- Pipeline to authenticate to [MongoDB](https://www.mongodb.com)
- API unit tests for *Employees*, *GlobalData*, *Sensors*, *Buckets*, *Devices*, *Staff*, *Shelves*, *Layout*, *Stock*, *Racks* and *Manifests*
- Property Based Testing for *Staff*, *GlobalData*, *Sensors* and *Layout*
- [Grafana](https://grafana.com) implementation
- [Grafana](https://grafana.com) dashboards displaying *Staff*, *Cart*, *Shelves*, *Racks*, *Buckets*, *Stock*, *Devices*, *Layout*, *Sensors* and *Manifests*

#### **Updated**
- Using items ids instead of the whole item in data generation
- Worker fully implemented, scheduling and terminating
- Generate data to use static items
- Project Documentation (`README.md`, `Project Structure`, `API documentation`)
- Worker name changed to *Populate Worker*

#### **Fixed**
- Pipeline mistakes
- Pipeline to run new tests
- Worker to use **http requests** to generate data
- Consistent JSON attributes in *Manifests*, *Layout* and *Stock*

#### **Removed**
- [MongoDB](https://www.mongodb.com) container deployment
- Pipeline unuseful requirement
- Mongo and Mongo-Express images removed from docker-compose

## Sprint 4 - 2022/01/13

---

#### **Updated**
- Pipeline to include [Grafana](https://grafana.com) as well
- Backend Dockerfile
- `Architecture documentation`

#### **Fixed**
- *Manifests* and *Layouts* PBTs
- Error with root *Layouts* and *Manifests* route
- *Populate Worker* bug fixes

#### **Removed**
- Frontend build and deploy from Pipeline