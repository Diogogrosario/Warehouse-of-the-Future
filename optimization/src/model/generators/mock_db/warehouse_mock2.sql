USE test;

insert into Warehouse (id) values (1);

insert into Shelf (warehouse_id, x, y) values (1, 4, 0); -- w = 20
insert into Shelf (warehouse_id, x, y) values (1, 9, 20); -- w = 15
insert into Shelf (warehouse_id, x, y) values (1, 4, 23); -- w = 20
insert into Shelf (warehouse_id, x, y) values (1, 9, 43); -- w = 15
insert into Shelf (warehouse_id, x, y) values (1, 4, 46); -- w = 20
insert into Shelf (warehouse_id, x, y) values (1, 9, 69); -- w = 15
insert into Shelf (warehouse_id, x, y) values (1, 4, 92); -- w = 20
insert into Shelf (warehouse_id, x, y) values (1, 4, 114); -- w = 20
insert into Shelf (warehouse_id, x, y) values (1, 4, 136); -- w = 20
insert into Shelf (warehouse_id, x, y) values (1, 9, 156); -- w = 15
insert into Shelf (warehouse_id, x, y) values (1, 4, 159); -- w = 20
insert into Shelf (warehouse_id, x, y) values (1, 9, 179); -- w = 15
insert into Shelf (warehouse_id, x, y) values (1, 4, 182); -- w = 20
insert into Shelf (warehouse_id, x, y) values (1, 9, 205); -- w = 15
insert into Shelf (warehouse_id, x, y) values (1, 4, 208); -- w = 20
insert into Shelf (warehouse_id, x, y) values (1, 4, 230); -- w = 200

-- 1
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (1, 1.5, 5, 20, 1, 600);
-- 2
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (1, 2.5, 5, 20, 0.75, 325);
-- 3
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (2, 1.95, 3, 15, 0.85, 550);
-- 4
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (3, 0.1, 5, 20, 1.5, 700);
-- 5
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (3, 1.6, 5, 20, 0.45, 625);
-- 6
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (3, 2.05, 5, 20, 1.75, 700);
-- 7
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (4, 1.65, 3, 15, 0.55, 550);
-- 8
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (5, 1.5, 5, 20, 0.85, 470);
-- 9
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (5, 0.5, 5, 20, 1, 800);
-- 10
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (6, 1.95, 9, 15, 0.85, 585);
-- 11
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (7, 0.1, 5, 20, 1.5, 700);
-- 12
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (7, 1.6, 5, 20, 0.45, 625);
-- 13
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (7, 2.05, 5, 20, 1.75, 700);
-- 14
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (8, 1.5, 5, 20, 0.85, 470);
-- 15
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (8, 0.5, 5, 20, 1, 800);
-- 16
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (9, 1.5, 5, 20, 1, 600);
-- 17
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (9, 2.5, 5, 20, 0.75, 325);
-- 18
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (10, 1.95, 3, 15, 0.85, 550);
-- 19
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (11, 0.1, 5, 20, 1.5, 700);
-- 20
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (11, 1.6, 5, 20, 0.45, 625);
-- 21
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (11, 2.05, 5, 20, 1.75, 700);
-- 22
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (12, 1.65, 3, 15, 0.55, 550);
-- 23
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (13, 1.5, 5, 20, 0.85, 470);
-- 24
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (13, 0.5, 5, 20, 1, 800);
-- 25
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (14, 1.95, 9, 15, 0.85, 585);
-- 26
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (15, 0.1, 5, 20, 1.5, 700);
-- 27
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (15, 1.6, 5, 20, 0.45, 625);
-- 28
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (15, 2.05, 5, 20, 1.75, 700);
-- 29
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (16, 1.5, 5, 20, 0.85, 470);
-- 30
insert into Rack (shelf_id, y, length, width, height, capacity) values 
                (16, 0.5, 5, 20, 1, 800);

insert into Sector (id, name) values (1, '123');

insert into Product (width, height, weight,sector_id) values (0.85, 0.75, 50,1);

insert into Product (width, height, weight,sector_id) values (1.6, 0.95, 120,1);

insert into Product (width, height, weight,sector_id) values (1, 0.5, 25,1);

insert into Product (width, height, weight,sector_id) values (1.35, 0.7, 200,1);

insert into Product (width, height, weight,sector_id) values (1.15, 0.81, 196,1);

insert into Product (width, height, weight,sector_id) values (0.78, 0.63, 259,1);

insert into Product (width, height, weight,sector_id) values (0.99, 1.35, 445,1);

insert into Product (width, height, weight,sector_id) values (0.53, 0.5, 282,1);

insert into Product (width, height, weight,sector_id) values (0.3, 0.87, 65,1);

insert into Product (width, height, weight,sector_id) values (0.47, 0.39, 104,1);

insert into Product (width, height, weight,sector_id) values (0.23, 0.43, 514,1);

insert into Product (width, height, weight,sector_id) values (0.87, 0.97, 12,1);

insert into Product (width, height, weight,sector_id) values (0.46, 0.53, 309,1);

insert into Product (width, height, weight,sector_id) values (0.54, 0.51, 310,1);

insert into Product (width, height, weight,sector_id) values (0.96, 0.53, 270,1);

insert into Product (width, height, weight,sector_id) values (0.84, 0.36, 4,1);

insert into Product (width, height, weight,sector_id) values (1.65, 0.46, 155,1);

insert into Product (width, height, weight,sector_id) values (0.86, 0.57, 106,1);

insert into Product (width, height, weight,sector_id) values (1.72, 0.74, 166,1);

insert into Product (width, height, weight,sector_id) values (1.86, 0.28, 335,1);

insert into Product (width, height, weight,sector_id) values (0.28, 0.49, 449,1);

insert into Product (width, height, weight,sector_id) values (0.4, 0.73, 160,1);

insert into Product (width, height, weight,sector_id) values (0.8, 0.21, 224,1);

insert into Product (width, height, weight,sector_id) values (0.51, 0.3, 95,1);

insert into Product (width, height, weight,sector_id) values (0.61, 1.05, 609,1);

insert into Product (width, height, weight,sector_id) values (0.58, 0.38, 29,1);

insert into Product (width, height, weight,sector_id) values (0.9, 0.19, 303,1);

insert into Product (width, height, weight,sector_id) values (0.5, 1.24, 103,1);

insert into Product (width, height, weight,sector_id) values (0.34, 0.49, 264,1);

insert into Product (width, height, weight,sector_id) values (1.4, 0.55, 330,1);

insert into Product (width, height, weight,sector_id) values (2.25, 0.63, 70,1);

insert into Product (width, height, weight,sector_id) values (1.36, 0.63, 486,1);

insert into Product (width, height, weight,sector_id) values (1.73, 0.38, 139,1);

insert into Product (width, height, weight,sector_id) values (1.42, 0.64, 171,1);

insert into Month_Manifesto(date) values('2021-11-29');

insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(1,1,1000);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(2,1,1000);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(3,1,1000);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(4,1,1000);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(5,1,1000);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(6,1,1000);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(7,1,1000);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(8,1,1000);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(9,1,1000);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(10,1,1000);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(11,1,1000);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(12,1,1000);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(13,1,1000);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(14,1,1000);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(15,1,90);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(16,1,90);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(17,1,90);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(18,1,90);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(19,1,90);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(20,1,90);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(21,1,90);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(22,1,90);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(23,1,90);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(24,1,1000);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(25,1,502);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(26,1,502);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(27,1,502);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(28,1,502);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(29,1,502);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(30,1,502);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(31,1,502);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(32,1,502);
insert into Month_Manifesto_Product(product_id,manifesto_id,quantity) values(33,1,502);


insert into Worker_Manifesto (id) values (1);
insert into Worker_Manifesto (id) values (2);
insert into Worker_Manifesto (id) values (3);
insert into Worker_Manifesto (id) values (4);
insert into Worker_Manifesto (id) values (5);
insert into Worker_Manifesto (id) values (6);
insert into Worker_Manifesto (id) values (7);
insert into Worker_Manifesto (id) values (8);
insert into Worker_Manifesto (id) values (9);
insert into Worker_Manifesto (id) values (10);

insert into Worker_Manifesto_Product (manifesto_id, product_id, quantity) values (1, 32, 1);
insert into Worker_Manifesto_Product (manifesto_id, product_id, quantity) values (1, 32, 1);
insert into Worker_Manifesto_Product (manifesto_id, product_id, quantity) values (1, 32, 1);
insert into Worker_Manifesto_Product (manifesto_id, product_id, quantity) values (2, 2, 1);
insert into Worker_Manifesto_Product (manifesto_id, product_id, quantity) values (2, 5, 1);
insert into Worker_Manifesto_Product (manifesto_id, product_id, quantity) values (3, 32, 1);
insert into Worker_Manifesto_Product (manifesto_id, product_id, quantity) values (3, 4, 1);
insert into Worker_Manifesto_Product (manifesto_id, product_id, quantity) values (4, 7, 1);
insert into Worker_Manifesto_Product (manifesto_id, product_id, quantity) values (5, 10, 1);
insert into Worker_Manifesto_Product (manifesto_id, product_id, quantity) values (5, 16, 1);
insert into Worker_Manifesto_Product (manifesto_id, product_id, quantity) values (5, 2, 1);
insert into Worker_Manifesto_Product (manifesto_id, product_id, quantity) values (6, 5, 1);
insert into Worker_Manifesto_Product (manifesto_id, product_id, quantity) values (7, 7, 1);
insert into Worker_Manifesto_Product (manifesto_id, product_id, quantity) values (7, 32, 1);
insert into Worker_Manifesto_Product (manifesto_id, product_id, quantity) values (8, 16, 1);
insert into Worker_Manifesto_Product (manifesto_id, product_id, quantity) values (9, 32, 1);
insert into Worker_Manifesto_Product (manifesto_id, product_id, quantity) values (9, 8, 1);
insert into Worker_Manifesto_Product (manifesto_id, product_id, quantity) values (10, 16, 1);

