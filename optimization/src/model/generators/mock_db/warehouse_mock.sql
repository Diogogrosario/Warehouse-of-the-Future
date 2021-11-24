insert into warehouse (id) values (1);

insert into shelf (warehouse_id, x, y) values (1, 4, 0);
insert into shelf (warehouse_id, x, y) values (1, 9, 2);
insert into shelf (warehouse_id, x, y) values (1, 4, 5);
insert into shelf (warehouse_id, x, y) values (1, 9, 6);
insert into shelf (warehouse_id, x, y) values (1, 4, 9);
insert into shelf (warehouse_id, x, y) values (1, 9, 15);
insert into shelf (warehouse_id, x, y) values (1, 4, 18);
insert into shelf (warehouse_id, x, y) values (1, 4, 21);


-- 1
insert into rack (shelf_id, y, length, width, height, capacity) values 
                (1, 1.5, 5, 2, 1, 600);
-- 2
insert into rack (shelf_id, y, length, width, height, capacity) values 
                (1, 2.5, 5, 2, 0.75, 325);
-- 3
insert into rack (shelf_id, y, length, width, height, capacity) values 
                (2, 1.95, 3, 2.5, 0.85, 550);
-- 4
insert into rack (shelf_id, y, length, width, height, capacity) values 
                (3, 0.1, 5, 1, 1.5, 700);
-- 5
insert into rack (shelf_id, y, length, width, height, capacity) values 
                (3, 1.6, 5, 1, 0.45, 625);
-- 6
insert into rack (shelf_id, y, length, width, height, capacity) values 
                (3, 2.05, 5, 1, 1.75, 700);
-- 7
insert into rack (shelf_id, y, length, width, height, capacity) values 
                (4, 1.65, 3, 1.65, 0.55, 550);
-- 8
insert into rack (shelf_id, y, length, width, height, capacity) values 
                (5, 1.5, 5, 3, 0.85, 470);
-- 9
insert into rack (shelf_id, y, length, width, height, capacity) values 
                (5, 0.5, 5, 3, 1, 800);
-- 10
insert into rack (shelf_id, y, length, width, height, capacity) values 
                (6, 1.95, 9, 2.5, 0.85, 585);
-- 11
insert into rack (shelf_id, y, length, width, height, capacity) values 
                (7, 0.1, 5, 1, 1.5, 700);
-- 12
insert into rack (shelf_id, y, length, width, height, capacity) values 
                (7, 1.6, 5, 1, 0.45, 625);
-- 13
insert into rack (shelf_id, y, length, width, height, capacity) values 
                (7, 2.05, 5, 1, 1.75, 700);
-- 14
insert into rack (shelf_id, y, length, width, height, capacity) values 
                (8, 1.5, 5, 3, 0.85, 470);
-- 15
insert into rack (shelf_id, y, length, width, height, capacity) values 
                (8, 0.5, 5, 3, 1, 800);

-- rack 1
insert into piece (width, height, weight) values (0.85, 0.75, 50);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(0.0, 1.5, 1, 1);
insert into piece (width, height, weight) values (1.6, 0.95, 120);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(1.5, 4, 1, 2);
insert into piece (width, height, weight) values (1, 0.5, 25);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(4, 4.5, 1, 4);
-- rack 2
insert into piece (width, height, weight) values (1.35, 0.7, 200);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(0.0, 3, 2, 5);
-- rack 3
insert into piece (width, height, weight) values (1.15, 0.81, 196);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(1.5, 3, 3, 6);
insert into piece (width, height, weight) values (0.78, 0.63, 259);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(0.0, 1,5, 3, 7);
-- rack 4
insert into piece (width, height, weight) values (0.99, 1.35, 445);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(0, 2.5, 4, 8);
insert into piece (width, height, weight) values (0.53, 0.5, 282);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(3, 4, 4, 9);
insert into piece (width, height, weight) values (0.3, 0.87, 65);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(4.0, 4.5, 4, 10);
-- rack 5
insert into piece (width, height, weight) values (0.47, 0.39, 104);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(1.5, 2.7, 5, 11);
insert into piece (width, height, weight) values (0.23, 0.43, 514);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(0, 1.25, 5, 12);
-- rack 6
insert into piece (width, height, weight) values (0.87, 0.97, 12);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(1.5, 2.3, 6, 13);
insert into piece (width, height, weight) values (0.46, 0.53, 309);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(0.3, 1.4, 6, 14);
insert into piece (width, height, weight) values (0.54, 0.51, 310);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(3.4, 4.5, 6, 15);
-- rack 7
insert into piece (width, height, weight) values (0.96, 0.53, 270);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(2.5, 3.0, 7, 16);
insert into piece (width, height, weight) values (0.84, 0.36, 4);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(1.4, 1.7, 7, 17);
-- rack 8
insert into piece (width, height, weight) values (1.65, 0.46, 155);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(3.6, 4.7, 8, 18);
insert into piece (width, height, weight) values (0.86, 0.57, 106);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(2.5, 3.0, 8, 19);
insert into piece (width, height, weight) values (1.72, 0.74, 166);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(0.4, 1.5, 8, 20);
--rack 9
insert into piece (width, height, weight) values (1.86, 0.28, 335);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(0.4, 1.5, 9, 21);
insert into piece (width, height, weight) values (0.28, 0.49, 449);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(1.7, 3, 9, 22);
--rack 10
insert into piece (width, height, weight) values (0.4, 0.73, 160);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(0.4, 2.4, 10, 23);
insert into piece (width, height, weight) values (0.8, 0.21, 224);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(3.5, 5.7, 10, 24);
insert into piece (width, height, weight) values (0.51, 0.3, 95);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(6, 7, 10, 25);
--rack 11
insert into piece (width, height, weight) values (0.61, 1.05, 609);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(0, 2.4, 11, 26);
insert into piece (width, height, weight) values (0.58, 0.38, 29);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(2.8, 3.3, 11, 27);
--rack 12
insert into piece (width, height, weight) values (0.9, 0.19, 303);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(2.8, 3.9, 12, 28);
--rack 13
insert into piece (width, height, weight) values (0.5, 1.24, 103);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(1.2, 2, 13, 29);
insert into piece (width, height, weight) values (0.34, 0.49, 264);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(2.6, 3.5, 13, 30);
--rack 14
insert into piece (width, height, weight) values (1.4, 0.55, 330);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(4, 4.9, 14, 31);
insert into piece (width, height, weight) values (2.25, 0.63, 70);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(2.6, 3.5, 14, 32);
--rack 15
insert into piece (width, height, weight) values (1.36, 0.63, 486);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(1, 2.9, 15, 33);
insert into piece (width, height, weight) values (1.73, 0.38, 139);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(4, 4.7, 15, 34);
insert into piece (width, height, weight) values (1.42, 0.64, 171);
insert into rack_piece (x_orig, x_end, rack_id, piece_id) values(3.4, 4, 15, 35);

