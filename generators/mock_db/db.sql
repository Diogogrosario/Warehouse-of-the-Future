create table warehouse (
    id INT PRIMARY KEY
);

create table shelf (
    id INT PRIMARY KEY,
    warehouse_id INT NOT NULL REFERENCES warehouse(id), 
    x NOT NULL INT,
    y NOT NULL INT
);

create table rack (
    id INT PRIMARY KEY, 
    shelf_id INT NOT NULL REFERENCES shelf(id),
    y NOT NULL DECIMAL(9,2),
    length NOT NULL INT,
    width NOT NULL DECIMAL(9,2), 
    height NOT NULL DECIMAL(9,2),
    capacity NOT NULL DECIMAL(9,2) 
);

create table piece (
    id INT PRIMARY KEY, 
    width NOT NULL DECIMAL(9,2), 
    height NOT NULL DECIMAL(9,2),
    weight NOT NULL DECIMAL(6,2)
);

create table rack_piece (
    x_orig NOT NULL INT,
    x_end NOT NULL INT,
    rack_id INT NOT NULL REFERENCES rack(id),
    piece_id INT NOT NULL REFERENCES piece(id)
);