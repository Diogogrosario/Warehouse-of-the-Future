CREATE DATABASE IF NOT EXISTS test;

DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Warehouse;
DROP TABLE IF EXISTS Shelf;
DROP TABLE IF EXISTS Product_Type;
DROP TABLE IF EXISTS Rack;
DROP TABLE IF EXISTS Product_Rack;
DROP TABLE IF EXISTS Results;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS Products_Left_Out;



create table Warehouse
(
    id SERIAL PRIMARY KEY
);

create table Shelf
(
    id           SERIAL PRIMARY KEY,
    x            DECIMAL(10, 3),
    y            DECIMAL(10, 3),
    warehouse_id BIGINT UNSIGNED NOT NULL,

    FOREIGN KEY (warehouse_id) REFERENCES Warehouse (id)
);

create table Product_Type
(
    id   SERIAL PRIMARY KEY,
    name TEXT
);

create table Product
(
    id        SERIAL PRIMARY KEY,
    name      TEXT,
    height    DECIMAL(10, 3),
    width     DECIMAL(10, 3),
    weight    DECIMAL(10, 3),
    type_id   BIGINT UNSIGNED NOT NULL,
    frequency DECIMAL(10, 3) DEFAULT 0,

    FOREIGN KEY (type_id) REFERENCES Product_Type (id)
);

create table Rack
(
    id       SERIAL PRIMARY KEY,
    shelf_id BIGINT UNSIGNED NOT NULL,
    y        DECIMAL(10, 3)  NOT NULL,
    width    DECIMAL(10, 3)  NOT NULL,
    height   DECIMAL(10, 3)  NOT NULL,
    capacity DECIMAL(10, 3)  NOT NULL,


    FOREIGN KEY (shelf_id) REFERENCES Shelf (id)

);



CREATE TABLE users
(
    id                SERIAL PRIMARY KEY,
    name              varchar(255) NOT NULL,
    email             varchar(255) NOT NULL,
    email_verified_at timestamp    NULL DEFAULT NULL,
    password          varchar(255) NOT NULL,
    remember_token    varchar(100)      DEFAULT NULL,
    created_at        timestamp    NULL DEFAULT NULL,
    updated_at        timestamp    NULL DEFAULT NULL
);

-- OUTPUT --
create table Results
(
    id          SERIAL PRIMARY KEY,
    date_issued DATETIME,
    is_read     BOOLEAN DEFAULT FALSE
);
create table Product_Rack
(
    id         SERIAL PRIMARY KEY,
    x_orig     INT             NOT NULL,
    x_end      INT             NOT NULL,
    result_id  BIGINT UNSIGNED NOT NULL,
    rack_id    BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,


    FOREIGN KEY (product_id) REFERENCES Product (id),
    FOREIGN KEY (result_id) REFERENCES Results (id),
    FOREIGN KEY (rack_id) REFERENCES Rack (id)
);

create table Products_Left_Out
(
    id         SERIAL PRIMARY KEY,
    result_id  BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,

    FOREIGN KEY (product_id) REFERENCES Product (id),
    FOREIGN KEY (result_id) REFERENCES Results (id)
);


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


insert into Shelf (warehouse_id, x, y)
values (1, 40, 0);
insert into Shelf (warehouse_id, x, y)
values (1, 90, 2);
insert into Shelf (warehouse_id, x, y)
values (1, 40, 5);
insert into Shelf (warehouse_id, x, y)
values (1, 90, 6);
insert into Shelf (warehouse_id, x, y)
values (1, 40, 9);


insert into Shelf (warehouse_id, x, y)
values (1, 400, 0);
insert into Shelf (warehouse_id, x, y)
values (1, 900, 2);
insert into Shelf (warehouse_id, x, y)
values (1, 400, 5);
insert into Shelf (warehouse_id, x, y)
values (1, 900, 6);
insert into Shelf (warehouse_id, x, y)
values (1, 400, 9);


insert into Shelf (warehouse_id, x, y)
values (1, 4000, 0);
insert into Shelf (warehouse_id, x, y)
values (1, 9000, 2);
insert into Shelf (warehouse_id, x, y)
values (1, 4000, 5);
insert into Shelf (warehouse_id, x, y)
values (1, 9000, 6);
insert into Shelf (warehouse_id, x, y)
values (1, 4000, 9);



insert into Rack (shelf_id, y, width, height, capacity)
values (1, 0.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (1, 1.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (1, 2.00, 500, 150, 2000000);

insert into Rack (shelf_id, y, width, height, capacity)
values (1, 3.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (1, 4.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (1, 5.00, 500, 150, 2000000);


insert into Rack (shelf_id, y, width, height, capacity)
values (2, 0.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (2, 1.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (2, 2.00, 500, 150, 2000000);

insert into Rack (shelf_id, y, width, height, capacity)
values (2, 3.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (2, 4.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (2, 5.00, 500, 150, 2000000);


insert into Rack (shelf_id, y, width, height, capacity)
values (3, 0.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (3, 1.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (3, 2.00, 500, 150, 2000000);

insert into Rack (shelf_id, y, width, height, capacity)
values (3, 3.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (3, 4.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (3, 5.00, 500, 150, 2000000);


insert into Rack (shelf_id, y, width, height, capacity)
values (4, 0.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (4, 1.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (4, 2.00, 500, 150, 2000000);

insert into Rack (shelf_id, y, width, height, capacity)
values (4, 3.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (4, 4.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (4, 5.00, 500, 150, 2000000);


insert into Rack (shelf_id, y, width, height, capacity)
values (5, 0.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (5, 1.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (5, 2.00, 500, 150, 2000000);

insert into Rack (shelf_id, y, width, height, capacity)
values (6, 3.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (6, 4.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (6, 5.00, 500, 150, 2000000);


insert into Rack (shelf_id, y, width, height, capacity)
values (7, 3.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (7, 4.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (7, 5.00, 500, 150, 2000000);

insert into Rack (shelf_id, y, width, height, capacity)
values (8, 3.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (8, 4.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (8, 5.00, 500, 150, 2000000);


insert into Rack (shelf_id, y, width, height, capacity)
values (9, 3.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (9, 4.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (9, 5.00, 500, 150, 2000000);

insert into Rack (shelf_id, y, width, height, capacity)
values (10, 3.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (10, 4.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (10, 5.00, 500, 150, 2000000);



insert into Rack (shelf_id, y, width, height, capacity)
values (11, 0.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (11, 1.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (11, 2.00, 500, 150, 2000000);

insert into Rack (shelf_id, y, width, height, capacity)
values (11, 3.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (11, 4.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (11, 5.00, 500, 150, 2000000);


insert into Rack (shelf_id, y, width, height, capacity)
values (12, 0.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (12, 1.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (12, 2.00, 500, 150, 2000000);

insert into Rack (shelf_id, y, width, height, capacity)
values (12, 3.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (12, 4.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (12, 5.00, 500, 150, 2000000);


insert into Rack (shelf_id, y, width, height, capacity)
values (13, 0.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (13, 1.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (13, 2.00, 500, 150, 2000000);

insert into Rack (shelf_id, y, width, height, capacity)
values (13, 3.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (13, 4.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (13, 5.00, 500, 150, 2000000);


insert into Rack (shelf_id, y, width, height, capacity)
values (14, 0.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (14, 1.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (14, 2.00, 500, 150, 2000000);

insert into Rack (shelf_id, y, width, height, capacity)
values (14, 3.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (14, 4.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (14, 5.00, 500, 150, 2000000);


insert into Rack (shelf_id, y, width, height, capacity)
values (15, 0.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (15, 1.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (15, 2.00, 500, 150, 2000000);

insert into Rack (shelf_id, y, width, height, capacity)
values (16, 3.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (16, 4.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (16, 5.00, 500, 150, 2000000);


insert into Rack (shelf_id, y, width, height, capacity)
values (17, 3.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (17, 4.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (17, 5.00, 500, 150, 2000000);

insert into Rack (shelf_id, y, width, height, capacity)
values (18, 3.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (18, 4.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (18, 5.00, 500, 150, 2000000);


insert into Rack (shelf_id, y, width, height, capacity)
values (19, 3.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (19, 4.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (19, 5.00, 500, 150, 2000000);


insert into Rack (shelf_id, y, width, height, capacity)
values (20, 3.0, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (20, 4.00, 500, 150, 2000000);
insert into Rack (shelf_id, y, width, height, capacity)
values (20, 5.00, 500, 150, 2000000);


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
