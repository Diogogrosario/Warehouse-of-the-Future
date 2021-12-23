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
insert into Shelf (warehouse_id, x, y)
values (1, 4, 9);


insert into Rack (shelf_id, y, length, width, height, capacity)
values (1, 0.0, 5, 5, 1.0, 1000);
insert into Rack (shelf_id, y, length, width, height, capacity)
values (1, 1.00, 5, 5, 1.0, 1000);
insert into Rack (shelf_id, y, length, width, height, capacity)
values (1, 2.00, 5, 5, 1.0, 1000);

insert into Rack (shelf_id, y, length, width, height, capacity)
values (1, 3.0, 5, 5, 1.0, 1000);
insert into Rack (shelf_id, y, length, width, height, capacity)
values (1, 4.00, 5, 5, 1.0, 1000);
insert into Rack (shelf_id, y, length, width, height, capacity)
values (1, 5.00, 5, 5, 1.0, 1000);


insert into Rack (shelf_id, y, length, width, height, capacity)
values (2, 0.0, 5, 5, 1.0, 1000);
insert into Rack (shelf_id, y, length, width, height, capacity)
values (2, 1.00, 5, 5, 1.0, 1000);
insert into Rack (shelf_id, y, length, width, height, capacity)
values (2, 2.00, 5, 5, 1.0, 1000);

insert into Rack (shelf_id, y, length, width, height, capacity)
values (2, 3.0, 5, 5, 1.0, 1000);
insert into Rack (shelf_id, y, length, width, height, capacity)
values (2, 4.00, 5, 5, 1.0, 1000);
insert into Rack (shelf_id, y, length, width, height, capacity)
values (2, 5.00, 5, 5, 1.0, 1000);


insert into Rack (shelf_id, y, length, width, height, capacity)
values (3, 0.0, 5, 5, 1.0, 1000);
insert into Rack (shelf_id, y, length, width, height, capacity)
values (3, 1.00, 5, 5, 1.0, 1000);
insert into Rack (shelf_id, y, length, width, height, capacity)
values (3, 2.00, 5, 5, 1.0, 1000);

insert into Rack (shelf_id, y, length, width, height, capacity)
values (3, 3.0, 5, 5, 1.0, 1000);
insert into Rack (shelf_id, y, length, width, height, capacity)
values (3, 4.00, 5, 5, 1.0, 1000);
insert into Rack (shelf_id, y, length, width, height, capacity)
values (3, 5.00, 5, 5, 1.0, 1000);


insert into Rack (shelf_id, y, length, width, height, capacity)
values (4, 0.0, 5, 5, 1.0, 1000);
insert into Rack (shelf_id, y, length, width, height, capacity)
values (4, 1.00, 5, 5, 1.0, 1000);
insert into Rack (shelf_id, y, length, width, height, capacity)
values (4, 2.00, 5, 5, 1.0, 1000);

insert into Rack (shelf_id, y, length, width, height, capacity)
values (4, 3.0, 5, 5, 1.0, 1000);
insert into Rack (shelf_id, y, length, width, height, capacity)
values (4, 4.00, 5, 5, 1.0, 1000);
insert into Rack (shelf_id, y, length, width, height, capacity)
values (4, 5.00, 5, 5, 1.0, 1000);


insert into Rack (shelf_id, y, length, width, height, capacity)
values (5, 0.0, 5, 5, 1.0, 1000);
insert into Rack (shelf_id, y, length, width, height, capacity)
values (5, 1.00, 5, 5, 1.0, 1000);
insert into Rack (shelf_id, y, length, width, height, capacity)
values (5, 2.00, 5, 5, 1.0, 1000);

insert into Rack (shelf_id, y, length, width, height, capacity)
values (5, 3.0, 5, 5, 1.0, 1000);
insert into Rack (shelf_id, y, length, width, height, capacity)
values (5, 4.00, 5, 5, 1.0, 1000);
insert into Rack (shelf_id, y, length, width, height, capacity)
values (5, 5.00, 5, 5, 1.0, 1000);


insert into Sector(name)
values ('painting');

insert into Sector(name)
values ('metal');

insert into Sector(name)
values ('lights');

insert into Sector(name)
values ('tyres');

insert into Sector(name)
values ('plastics');

insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 1);
insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 1);
insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 1);
insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 1);
insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 1);


insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 2);
insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 2);
insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 2);
insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 2);
insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 2);


insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 3);
insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 3);
insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 3);
insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 3);
insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 3);


insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 4);
insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 4);
insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 4);
insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 4);
insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 4);


insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 5);
insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 5);
insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 5);
insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 5);
insert into Product (width, height, weight, sector_id)
values (1.00, 0.5, 50, 5);