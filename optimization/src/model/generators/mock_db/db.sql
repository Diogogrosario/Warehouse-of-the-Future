CREATE
DATABASE IF NOT EXISTS test;

USE
test;

DROP TABLE IF EXISTS Warehouse;
DROP TABLE IF EXISTS Shelf;
DROP TABLE IF EXISTS Product_Type;
DROP TABLE IF EXISTS Rack;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Product_Rack;
DROP TABLE IF EXISTS Month_Manifesto;
DROP TABLE IF EXISTS Month_Manifesto_Product;
DROP TABLE IF EXISTS Worker_Manifesto;
DROP TABLE IF EXISTS Worker_Manifesto_Product;
DROP TABLE IF EXISTS Results;
DROP TABLE IF EXISTS Products_Left_Out;
DROP TABLE IF EXISTS Window;

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

create table Product_Type
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

create table Rack
(
    id       SERIAL PRIMARY KEY,
    shelf_id BIGINT UNSIGNED NOT NULL,
    y        DECIMAL(9, 2) NOT NULL,
    length   INT           NOT NULL,
    width    DECIMAL(9, 2) NOT NULL,
    height   DECIMAL(9, 2) NOT NULL,
    capacity DECIMAL(9, 2) NOT NULL,

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
    type_id   BIGINT UNSIGNED NOT NULL,
    frequency DECIMAL(30, 5) DEFAULT 0,

    FOREIGN KEY (type_id) REFERENCES Product_Type (id)
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
    quantity     INT DEFAULT 0,

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

CREATE TABLE users
(
    id                SERIAL PRIMARY KEY,
    name              varchar(255) NOT NULL,
    email             varchar(255) NOT NULL,
    email_verified_at timestamp NULL DEFAULT NULL,
    password          varchar(255) NOT NULL,
    remember_token    varchar(100) DEFAULT NULL,
    created_at        timestamp NULL DEFAULT NULL,
    updated_at        timestamp NULL DEFAULT NULL
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
    x_orig     INT NOT NULL,
    x_end      INT NOT NULL,
    result_id  BIGINT UNSIGNED NOT NULL,
    rack_id    BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,

    FOREIGN KEY (result_id) REFERENCES Results (id),
    FOREIGN KEY (rack_id) REFERENCES Rack (id),
    FOREIGN KEY (product_id) REFERENCES Product (id)
);

create table Products_Left_Out
(
    id         SERIAL PRIMARY KEY,
    result_id  BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (result_id) REFERENCES Results (id),
    FOREIGN KEY (product_id) REFERENCES Product (id)
);
create table Window (
    id      SERIAL PRIMARY KEY, 
    x            DECIMAL(4, 1),
    y            DECIMAL(4, 1)
);


DROP PROCEDURE IF EXISTS calculate_product_frequency;

DELIMITER //

CREATE PROCEDURE calculate_product_frequency(IN prod_id INT)
BEGIN
    DECLARE
total_pieces INT;
    DECLARE
freq INT;

    SET
freq = (SELECT COUNT(A.id)
                FROM (
                         SELECT id
                         FROM Worker_Manifesto_Product
                         WHERE product_id = prod_id
                         GROUP BY manifesto_id
                     ) as A);

    SET
total_pieces = (SELECT COUNT(A.id) /*this number is to normalize the results*/
                        FROM (
                                 SELECT id
                                 FROM Worker_Manifesto_Product
                                 GROUP BY manifesto_id
                             ) as A);

UPDATE Product
SET frequency = freq / total_pieces
where id = prod_id;
END
//

DELIMITER ; 
