# Integration

### Planned Integration

* Connect the products data from data lake group.

* Connect the warehouse positioning from data lake group.

* Output the product allocation to shelves to team 1 group.

### Integration executed

* Connect the products data from data lake group. 

Due to lack of time and the missing of a POST request /layouts defined in data lake group, we decided to maintain our monolithic functional, but not fully integrated.


### Further work

#### Note: There is a semantic difference between us and the group 1. They name our Rack, shelf, and our shelf, Rack. The concepts are inverted.

* Data lake group followed a SQL philosophy in Mongo, this is a performance concern that should be taken into account when integrating the missing elements.

* In order to integrate the orientation of the storage elements, the data lake should include a 2D/3D spacial orientation of those shelves as well as it's capacity and type.

* The concept of type wasn't taken into account by data lake and is useful to distinguish among products families. A category is a state of the art organization method.

* To output the results towards the data lake, further than the POST route necessary to store the results, it is necessary to made some modifications regarding the introduction of a concept of bucket.

* We organized products, they expect the organization of buckets, since the majority of products will be included in inside a bucket. This integration would require only allocating a product to a bucket, a one to one association, and then instead of an association Product-Rack, a Bucket-Rack should appear.