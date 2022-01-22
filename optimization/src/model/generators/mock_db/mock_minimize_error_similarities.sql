USE test;

insert into Warehouse (id)
values (1);

insert into Shelf (warehouse_id, x, y)
values (1, 4, 0);
insert into Shelf (warehouse_id, x, y)
values (1, 9, 2);
insert into Shelf (warehouse_id, x, y)
values (1, 4, 5);
insert into Shelf (warehouse_id, x, y)
values (1, 9, 6);


insert into Rack (shelf_id, y, width, height, capacity)
values (1, 0.0, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (1, 1.00, 5, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (1, 2.00, 5, 1.0, 1000);


insert into Rack (shelf_id, y, width, height, capacity)
values (1, 3.0, 20, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (1, 4.00, 20, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (1, 5.00, 20, 1.0, 1000);


insert into Rack (shelf_id, y, width, height, capacity)
values (2, 0.0, 20, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (2, 1.00, 20, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (2, 2.00, 20, 1.0, 1000);

insert into Rack (shelf_id, y, width, height, capacity)
values (2, 3.0, 20, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (2, 4.00, 20, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (2, 5.00, 20, 1.0, 1000);


insert into Rack (shelf_id, y, width, height, capacity)
values (3, 0.0, 2, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (3, 1.00, 20, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (3, 2.00, 20, 1.0, 1000);

insert into Rack (shelf_id, y, width, height, capacity)
values (3, 3.0, 20, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (3, 4.00, 20, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (3, 5.00, 20, 1.0, 1000);


insert into Rack (shelf_id, y, width, height, capacity)
values (4, 0.0, 20, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (4, 1.00, 20, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (4, 2.00, 20, 1.0, 1000);

insert into Rack (shelf_id, y, width, height, capacity)
values (4, 3.0, 20, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (4, 4.00, 20, 1.0, 1000);
insert into Rack (shelf_id, y, width, height, capacity)
values (4, 5.00, 20, 1.0, 1000);


insert into Product_Type(name)
values ('TESTING SET');

insert into Product_Type(name)
values ('metal');

insert into Product_Type(name)
values ('lights');

insert into Product_Type(name)
values ('tyres');

insert into Product_Type(name)
values ('plastics');

insert into Product_Type(name)
values ('dummy1');


insert into Product_Type(name)
values ('dummy2');

insert into Product_Type(name)
values ('dummy3');

insert into Product_Type(name)
values ('dummy4');

insert into Product_Type(name)
values ('dummy5');

insert into Product_Type(name)
values ('dummy6');

insert into Product_Type(name)
values ('dummy7');

insert into Product_Type(name)
values ('dummy8');

insert into Product_Type(name)
values ('dummy9');

insert into Product_Type(name)
values ('dummy10');

insert into Product_Type(name)
values ('dummy11');

insert into Product (width, height, weight, type_id)
values (0.05, 0.1, 1, 1);
insert into Product (width, height, weight, type_id)
values (0.05, 0.1, 1, 1);
insert into Product (width, height, weight, type_id)
values (0.05, 0.1, 1, 1);
insert into Product (width, height, weight, type_id)
values (0.5, 0.4, 100, 1);
insert into Product (width, height, weight, type_id)
values (0.5, 0.4, 100, 1);
insert into Product (width, height, weight, type_id)
values (0.5, 0.4, 100, 1);



insert into Product (width, height, weight, type_id)
values (4.00, 0.1, 150, 2);
insert into Product (width, height, weight, type_id)
values (4.00, 0.6, 300, 2);
insert into Product (width, height, weight, type_id)
values (4.00, 0.4, 200, 2);


insert into Product (width, height, weight, type_id)
values (4.00, 0.1, 150, 3);
insert into Product (width, height, weight, type_id)
values (4.00, 0.6, 300, 3);
insert into Product (width, height, weight, type_id)
values (4.00, 0.4, 200, 3);


insert into Product (width, height, weight, type_id)
values (4.00, 0.1, 150, 4);
insert into Product (width, height, weight, type_id)
values (4.00, 0.6, 300, 4);
insert into Product (width, height, weight, type_id)
values (4.00, 0.4, 200, 4);

insert into Product (width, height, weight, type_id)
values (4.00, 0.1, 150, 5);
insert into Product (width, height, weight, type_id)
values (4.00, 0.6, 300, 5);
insert into Product (width, height, weight, type_id)
values (4.00, 0.4, 200, 5);


insert into Product (width, height, weight, type_id)
values (4.00, 0.1, 150, 6);
insert into Product (width, height, weight, type_id)
values (4.00, 0.6, 300, 6);
insert into Product (width, height, weight, type_id)
values (4.00, 0.4, 200, 6);

insert into Product (width, height, weight, type_id)
values (4.00, 0.1, 150, 7);
insert into Product (width, height, weight, type_id)
values (4.00, 0.6, 300, 7);
insert into Product (width, height, weight, type_id)
values (4.00, 0.4, 200, 7);

insert into Product (width, height, weight, type_id)
values (4.00, 0.1, 150, 8);
insert into Product (width, height, weight, type_id)
values (4.00, 0.6, 300, 8);
insert into Product (width, height, weight, type_id)
values (4.00, 0.4, 200, 8);

insert into Product (width, height, weight, type_id)
values (4.00, 0.1, 150, 9);
insert into Product (width, height, weight, type_id)
values (4.00, 0.6, 300, 9);
insert into Product (width, height, weight, type_id)
values (4.00, 0.4, 200, 9);

insert into Product (width, height, weight, type_id)
values (4.00, 0.1, 150, 10);
insert into Product (width, height, weight, type_id)
values (4.00, 0.6, 300, 10);
insert into Product (width, height, weight, type_id)
values (4.00, 0.4, 200, 10);

insert into Product (width, height, weight, type_id)
values (4.00, 0.1, 150, 11);
insert into Product (width, height, weight, type_id)
values (4.00, 0.6, 300, 11);
insert into Product (width, height, weight, type_id)
values (4.00, 0.4, 200, 11);

insert into Product (width, height, weight, type_id)
values (4.00, 0.1, 150, 12);
insert into Product (width, height, weight, type_id)
values (4.00, 0.6, 300, 12);
insert into Product (width, height, weight, type_id)
values (4.00, 0.4, 200, 12);


insert into Product (width, height, weight, type_id)
values (4.00, 0.1, 150, 13);
insert into Product (width, height, weight, type_id)
values (4.00, 0.6, 300, 13);
insert into Product (width, height, weight, type_id)
values (4.00, 0.4, 200, 13);


insert into Product (width, height, weight, type_id)
values (4.00, 0.1, 150, 14);
insert into Product (width, height, weight, type_id)
values (4.00, 0.6, 300, 14);
insert into Product (width, height, weight, type_id)
values (4.00, 0.4, 200, 14);

insert into Product (width, height, weight, type_id)
values (4.00, 0.1, 150, 15);
insert into Product (width, height, weight, type_id)
values (4.00, 0.6, 300, 15);
insert into Product (width, height, weight, type_id)
values (4.00, 0.4, 200, 15);

insert into Product (width, height, weight, type_id)
values (4.00, 0.1, 150, 16);
insert into Product (width, height, weight, type_id)
values (4.00, 0.6, 300, 16);
insert into Product (width, height, weight, type_id)
values (4.00, 0.4, 200, 16);