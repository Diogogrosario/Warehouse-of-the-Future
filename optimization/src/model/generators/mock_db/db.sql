CREATE DATABASE IF NOT EXISTS test;

USE test;

DROP TABLE IF EXISTS Warehouse;
DROP TABLE IF EXISTS Shelf;
DROP TABLE IF EXISTS Cars;
DROP TABLE IF EXISTS Sector;
DROP TABLE IF EXISTS Rack;
DROP TABLE IF EXISTS Product;
DROP TABLE IF EXISTS Product_Rack;
DROP TABLE IF EXISTS Month_Manifesto;
DROP TABLE IF EXISTS Month_Manifesto_Product;
DROP TABLE IF EXISTS Worker_Manifesto;
DROP TABLE IF EXISTS Worker_Manifesto_Product;

create table Warehouse (
    id SERIAL,
    CONSTRAINT TablePK PRIMARY KEY(id)
);

create table Shelf (
	id SERIAL PRIMARY KEY,
    x DECIMAL(4,1),
	y DECIMAL(4,1),
	warehouse_id BIGINT UNSIGNED NOT NULL, 
    
    FOREIGN KEY (warehouse_id) REFERENCES warehouse(id)
);

create table Cars (
	id INT,
	name VARCHAR(50)
);

create table Sector (
	id INT,
	name VARCHAR(50)
);

create table Rack (
    id SERIAL, 
    shelf_id BIGINT UNSIGNED NOT NULL,
    y DECIMAL(9,2) NOT NULL,
    length INT NOT NULL,
    width DECIMAL(9,2) NOT NULL, 
    height DECIMAL(9,2) NOT NULL,
    capacity DECIMAL(9,2) NOT NULL,
    CONSTRAINT TablePK PRIMARY KEY(id) 
);

create table Product (
	name VARCHAR(50),
	length DECIMAL(5,1),
	height DECIMAL(5,1),
	width DECIMAL(5,1),
	weight DECIMAL(5,1),
	car_model_id INT,
	sector_id INT
);


create table Product_Rack (
    x_orig INT NOT NULL,
    x_end INT NOT NULL,
    rack_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL    
);

create table Month_Manifesto (
	id INT,
	date DATE
);

create table Month_Manifesto_Product (
	id INT,
	product_id INT,
	manifesto_id INT
);

create table Worker_Manifesto (
	id SERIAL
);

create table Worker_Manifesto_Product (
	id SERIAL,
	manifesto_id INT,
	product_id INT,
	quantity INT
);