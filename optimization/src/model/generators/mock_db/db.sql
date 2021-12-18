CREATE DATABASE IF NOT EXISTS test;

USE test;

DROP TABLE IF EXISTS Warehouse;
DROP TABLE IF EXISTS Shelf;
DROP TABLE IF EXISTS Sector;
DROP TABLE IF EXISTS Rack;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Product_Rack;
DROP TABLE IF EXISTS Month_Manifesto;
DROP TABLE IF EXISTS Month_Manifesto_Product;
DROP TABLE IF EXISTS Worker_Manifesto;
DROP TABLE IF EXISTS Worker_Manifesto_Product;

create table Warehouse
(
    id SERIAL PRIMARY KEY
);

create table Shelf
(
    id           SERIAL PRIMARY KEY,
    x            DECIMAL(4, 1),
    y            DECIMAL(4, 1),
    warehouse_id BIGINT UNSIGNED NOT NULL,

    FOREIGN KEY (warehouse_id) REFERENCES Warehouse (id)
);

create table Sector
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

create table Rack
(
    id       SERIAL PRIMARY KEY,
    shelf_id BIGINT UNSIGNED NOT NULL,
    y        DECIMAL(9, 2)   NOT NULL,
    length   INT             NOT NULL,
    width    DECIMAL(9, 2)   NOT NULL,
    height   DECIMAL(9, 2)   NOT NULL,
    capacity DECIMAL(9, 2)   NOT NULL,

    FOREIGN KEY (shelf_id) REFERENCES Shelf (id)

);

create table Product
(
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(50),
    length    DECIMAL(5, 1),
    height    DECIMAL(5, 1),
    width     DECIMAL(5, 1),
    weight    DECIMAL(5, 1),
    sector_id BIGINT UNSIGNED NOT NULL,
    frequency DECIMAL(3, 2),
    FOREIGN KEY (sector_id) REFERENCES Sector (id)
    );

create table Product_Rack
(
    id         SERIAL PRIMARY KEY,
    x_orig     INT             NOT NULL,
    x_end      INT             NOT NULL,
    rack_id    BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,

    FOREIGN KEY (rack_id) REFERENCES Rack (id),
    FOREIGN KEY (product_id) REFERENCES Product (id)
);

create table Month_Manifesto
(
    id   SERIAL PRIMARY KEY,
    date DATE
);

create table Month_Manifesto_Product
(
    id           SERIAL PRIMARY KEY,
    product_id   BIGINT UNSIGNED NOT NULL,
    manifesto_id BIGINT UNSIGNED NOT NULL,
    quantity     INT,

    FOREIGN KEY (product_id) REFERENCES Product (id),
    FOREIGN KEY (manifesto_id) REFERENCES Month_Manifesto (id)
);

create table Worker_Manifesto
(
    id SERIAL PRIMARY KEY
);

create table Worker_Manifesto_Product
(
    id           SERIAL PRIMARY KEY,
    manifesto_id BIGINT UNSIGNED NOT NULL,
    product_id   BIGINT UNSIGNED NOT NULL,
    quantity     INT,
    FOREIGN KEY (product_id) REFERENCES Product (id),
    FOREIGN KEY (manifesto_id) REFERENCES Worker_Manifesto (id)
);

DROP TRIGGER IF EXISTS calculate_product_frequency;

DELIMITER $$
CREATE TRIGGER calculate_product_frequency 
AFTER INSERT ON Worker_Manifesto_Product FOR EACH ROW
BEGIN
    DECLARE total_pieces INT;
    DECLARE freq INT;

    SET freq = (SELECT SUM(quantity) from Worker_Manifesto_Product
    WHERE product_id=new.product_id);

    SET total_pieces = (SELECT SUM(quantity) from Worker_Manifesto_Product); /*this number is to normalize the results*/
            
    UPDATE Product SET frequency = freq/total_pieces where id=new.product_id;

END $$
DELIMITER ;
