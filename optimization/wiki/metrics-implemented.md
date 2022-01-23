# Genetic Algorithm

## Implemented Optimizations

### Weight Optimization

Heavier products are located closer to the ground, to be more easily picked by
the fork-lift machine.

### Work Optimization

Heavier products should be more easily reachable by the worker.

### Frequency Optimization

Condense the occupied space so that the worker travels the minimum number of
sections, by grouping the most frequent products, minimizing the necessary time
and space.

### Minimize Errors Optimization

Whether on restocking or the collection, by keeping products of the same
category further away from each other, and if that is not possible, avoid
grouping products with similar dimensions (weight, height, width).

### Organization Optimization

Group products of the same category together, so that the warehouse is
organized in a simple and human-friendly way, increasing restocking speed (ex:
painting, screws, chassis products).

## Optimization Algorithm

### Warehouse structure
<!-- falar com backend -->

### Communication with webapp
<!-- falar com frontend-->

### Algorithm Behaviour

The algorithm starts by generating an initial population, each individual being
a warehouse layout. After that preliminary setup is done, the genetic algorithm
itself begins. The following procedure will be ran the corresponding amount of
times, depending on the number of iterations given.

The layout that has the highest score and another random layout reproduce,
creating a child layout. There is also a mutation chance involved, which means
that, with a given probability, the child will receive even further
modifications. The least fit individual is then removed from the population,
giving it's place to the newly generated layout.

Throughout the repetition of this, we will end up with better layouts, those
being the most suitable to meet the solicited requirements. After the execution
ends, the best layout is chosen.

### Crossover

### Mutation

## Implemented Metrics

### Weight Metric

The weight metric will prioritize layouts, whose heaviest products are situated
closest to the ground level. To achieve this, the racks with the lowest height,
from each shelf are considered the ideal racks to place the products on. A
flawless layout, by this metric's prespective, will have all of the products
stored on those lower racks.

### Work Metric

The work metric will prioritize layouts, whose products are stored closest to
chest level of the workers who will pick them up. The point being that the
worker won't have to to any additional movements (crouch or climb a ladder), to
get the product. This reduces the amount of effort necessary to get a product
into the cart. The aforementioned effort is calculated using the work formula
from physics: `W = fd cos θ`

### Frequency Metric

### Minimize Errors Metric

This metric's goal is to minimize the errors/mistakes when picking up the
products, for example a worker picking the wrong set of nails. With this
purpose in mind we have to define what increases the possibility of these
mistakes. The rationale applied was, that if similar products are placed
together, the error rate increases. Similar products are products which have
the same type/category. A perfect layout would be one in which shelves only
have a product of each type, however, when this is not possible, a second set
of rules were applied. Even if two products are in the same category their
dimensions may vary widely, when a perfect layout isn't attainable, the
distance between those product's dimensions are taken into account, favouring
the separation of similarly sized products. These distances are calculated by
the euclidian distance between vectors with the following format: `Vx =
(height_x, width_x, weight_x)`

### Organization Metric
