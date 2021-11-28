CREATE DATABASE IF NOT EXISTS test;

USE test;

DROP TABLE IF EXISTS rack_piece;
DROP TABLE IF EXISTS piece;
DROP TABLE IF EXISTS rack;
DROP TABLE IF EXISTS shelf;
DROP TABLE IF EXISTS warehouse;

create table warehouse (
    id SERIAL,
    CONSTRAINT TablePK PRIMARY KEY(id)
);

create table shelf (
    id SERIAL,
    warehouse_id BIGINT UNSIGNED NOT NULL, 
    x INT NOT NULL,
    y INT NOT NULL,
    CONSTRAINT TablePK PRIMARY KEY(id),
    CONSTRAINT warehouse_fk FOREIGN KEY (warehouse_id) REFERENCES warehouse(id)
);

create table rack (
    id SERIAL, 
    shelf_id BIGINT UNSIGNED NOT NULL,
    y DECIMAL(9,2) NOT NULL,
    length INT NOT NULL,
    width DECIMAL(9,2) NOT NULL, 
    height DECIMAL(9,2) NOT NULL,
    capacity DECIMAL(9,2) NOT NULL,
    CONSTRAINT TablePK PRIMARY KEY(id),
    CONSTRAINT shelf_fk FOREIGN KEY (shelf_id) REFERENCES shelf(id)


);

create table piece (
    id SERIAL, 
    width DECIMAL(9,2) NOT NULL, 
    height DECIMAL(9,2) NOT NULL,
    weight DECIMAL(6,2) NOT NULL,
    CONSTRAINT TablePK PRIMARY KEY(id)
);

create table rack_piece (
    x_orig INT NOT NULL,
    x_end INT NOT NULL,
    rack_id BIGINT UNSIGNED NOT NULL,
    piece_id BIGINT UNSIGNED NOT NULL,
    CONSTRAINT TablePK PRIMARY KEY(rack_id, piece_id),
    CONSTRAINT rack_fk FOREIGN KEY (rack_id) REFERENCES rack(id),
    CONSTRAINT piece_fk FOREIGN KEY (piece_id) REFERENCES piece(id)
);