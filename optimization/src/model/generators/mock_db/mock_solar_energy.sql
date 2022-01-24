USE test;

insert into Warehouse (id)
values (1);

insert into Shelf (warehouse_id, x, y)
values (1, 4, 1);
insert into Shelf (warehouse_id, x, y)
values (1, 9, 3);
insert into Shelf (warehouse_id, x, y)
values (1, 4, 6);
insert into Shelf (warehouse_id, x, y)
values (1, 9, 7);
insert into Shelf (warehouse_id, x, y)
values (1, 4, 10);


insert into Rack (shelf_id, y, width, height, capacity)
values (1, 0.0, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (1, 1.00, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (1, 2.00, 5, 1.0, 1000);

insert into Rack (shelf_id, y, width, height, capacity)
values (1, 3.0, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (1, 4.00, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (1, 5.00, 5, 1.0, 1000);


insert into Rack (shelf_id, y, width, height, capacity)
values (2, 0.0, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (2, 1.00, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (2, 2.00, 5, 1.0, 1000);

insert into Rack (shelf_id, y, width, height, capacity)
values (2, 3.0, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (2, 4.00, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (2, 5.00, 5, 1.0, 1000);


insert into Rack (shelf_id, y, width, height, capacity)
values (3, 0.0, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (3, 1.00, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (3, 2.00, 5, 1.0, 1000);

insert into Rack (shelf_id, y, width, height, capacity)
values (3, 3.0, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (3, 4.00, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (3, 5.00, 5, 1.0, 1000);


insert into Rack (shelf_id, y, width, height, capacity)
values (4, 0.0, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (4, 1.00, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (4, 2.00, 5, 1.0, 1000);

insert into Rack (shelf_id, y, width, height, capacity)
values (4, 3.0, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (4, 4.00, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (4, 5.00, 5, 1.0, 1000);


insert into Rack (shelf_id, y, width, height, capacity)
values (5, 0.0, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (5, 1.00, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (5, 2.00, 5, 1.0, 1000);

insert into Rack (shelf_id, y, width, height, capacity)
values (5, 3.0, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (5, 4.00, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (5, 5.00, 5, 1.0, 1000);


insert into Product_Type(name)
values ('painting');

insert into Product_Type(name)
values ('metal');

insert into Product_Type(name)
values ('lights');

insert into Product_Type(name)
values ('tyres');

insert into Product_Type(name)
values ('plastics');


insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 2, 0.0);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 2, 0.0);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 2, 0.0);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 2, 0.0);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 2, 0.0);

insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 1, 0.0);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 1, 0.0);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 1, 0.0);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 1, 0.0);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 1, 0.0);


insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 2, 0.0);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 2, 0.0);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 2, 0.0);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 2, 0.0);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 2, 0.0);


insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 3, 0.0);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 3, 0.0);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 3, 0.0);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 3, 0.0);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 3, 0.0);


insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 4, 1);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 4, 1);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 4, 1);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 4, 1);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 4, 1);


insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 5, 1);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 5, 1);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 5, 1);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 5, 1);
insert into Product (width, height, weight, type_id, frequency)
values (1.00, 0.5, 50, 5, 1);

insert into Window(x, y)
values (3, 0);

insert into Window(x, y)
values (6, 0);

insert into Window(x, y)
values (10, 2);

insert into Window(x, y)
values (2, 8);

insert into Window(x, y)
values (4, 11);

insert into Window(x, y)
values (5, 11);

insert into Window(x, y)
values (6, 11);

insert into Window(x, y)
values (7, 11);
