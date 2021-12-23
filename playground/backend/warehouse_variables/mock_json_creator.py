'''
This script creates a mock json file in this directory with mock values for variables needed to build the warehouse
'''
from abc import abstractproperty
import json
import random as rn
import os
import copy


# Variables (tuples with minimum and maximum values)

# Room
ROOM_WIDTH = (15, 25) # Float
ROOM_HEIGHT = (15, 20) # Float
NUM_Z1 = 1
NUM_Z2 = 3 
NUM_Z3 = 1
NUM_Z4 = 1 


# Shelf
SHELF_HEIGHT = (2, 4) # Float
NUM_SHELF_LAYERS = (1, 5) # Int

# Shelf layer
BUCKETS_PER_LINE = (1, 4) # Int
BUCKETS_PER_COLUMN = (1, 3) # Int
SHELF_HEIGHT = (1, 5) # Float
LAYER_HEIGHT = (2, 4) # Float
LAYER_WIDTH = (1, 5) # Float
LAYER_LENGTH = (1, 5) # Float

# Bucket
BUCKET_WIDTH = (1, 5) # Float
BUCKET_LENGTH = (1, 5) # Float
BUCKET_HEIGHT = (1, 5) # Float
BUCKET_TYPES = ["Small", "Regular", "Large"]
BUCKET_OBJ_TYPES = ["Screw_Box"]

# Top zone (Z1)

Z1_WIDTH = (12, 20) # Float, smaller than (ROOM_WIDTH - right_zone_width)
NUM_SHELVES_Z1 = (2, 3)

# Side zones (except rightmost, since it is bigger) (Z2)

Z2_WIDTH = (12, 16)
NUM_SHELVES_Z2 = (2, 3)


# Special side zones (Z3)

Z3_WIDTH = (18, 20)
NUM_SHELVES_Z3 = (2, 3)

# Bottom zones (Z3)

Z4_WIDTH = (2, 4)
NUM_SHELVES_Z4 = (1, 2)


def get_zone(i):
    if(i >= NUM_Z1 + NUM_Z2 + NUM_Z3):
        return (Z4_WIDTH, 4)
    if(i >= NUM_Z1 + NUM_Z2):
        return (Z3_WIDTH, 3)
    if(i >= NUM_Z1):
        return (Z2_WIDTH, 2)
    return (Z1_WIDTH, 1)

def get_num_shelves(zone_num):
    if(zone_num == 1):
        return NUM_SHELVES_Z1
    if(zone_num == 2):
        return NUM_SHELVES_Z2
    if(zone_num == 3):
        return NUM_SHELVES_Z3
    if(zone_num == 4):
        return NUM_SHELVES_Z4

json_dict = {}

room_width = round(rn.uniform(ROOM_WIDTH[0], ROOM_WIDTH[1]), 3)
room_height = round(rn.uniform(ROOM_WIDTH[0], ROOM_WIDTH[1]), 3)


json_dict["room_width"] = room_width
json_dict["room_height"] = room_height



zone_dict_list = []

for i in range(NUM_Z1 + NUM_Z2 + NUM_Z3 + NUM_Z4):
    zone_dict = {}

    zone = get_zone(i)
    zone_dict["ZONE_TYPE"] = zone[1]
    zone_dict["width"] = round(rn.uniform(zone[0][0], zone[0][1]), 3)

    zone_dict["shelf_height"] = round(rn.uniform(SHELF_HEIGHT[0], SHELF_HEIGHT[1]), 3)

    shelf_dict_list = []

    num_shelves = get_num_shelves(zone[1])
    for shelf in range(rn.randint(num_shelves[0], num_shelves[1])):
        shelf_dict = {}

        shelf_dict["shelf_height"] = round(rn.uniform(SHELF_HEIGHT[0], SHELF_HEIGHT[1]), 3)
        num_shelf_layers = rn.randint(NUM_SHELF_LAYERS[0], NUM_SHELF_LAYERS[1])

        shelf_layer_dicts_list = []
        for j in range(num_shelf_layers):
            shelf_layer_dict = {}
            buckets_per_line = rn.randint(BUCKETS_PER_LINE[0], BUCKETS_PER_LINE[1])
            buckets_per_col = rn.randint(BUCKETS_PER_LINE[0], BUCKETS_PER_LINE[1])
            num_buckets = buckets_per_line * buckets_per_col

            shelf_layer_dict["buckets_per_line"] = buckets_per_line
            shelf_layer_dict["buckets_per_column"] = buckets_per_col
            shelf_layer_dict["layer_width"] = round(rn.uniform(LAYER_WIDTH[0], LAYER_WIDTH[1]), 3)
            shelf_layer_dict["layer_length"] = round(rn.uniform(LAYER_LENGTH[0], LAYER_LENGTH[1]), 3)
            shelf_layer_dict["layer_height"] = round(rn.uniform(LAYER_HEIGHT[0], LAYER_HEIGHT[1]), 3)

            bucket_dicts_list = []
            for k in range(num_buckets):
                bucket_dict = {}
                bucket_dict["bucket_width"] = round(rn.uniform(BUCKET_WIDTH[0], BUCKET_WIDTH[1]), 3)
                bucket_dict["bucket_length"] = round(rn.uniform(BUCKET_LENGTH[0], BUCKET_LENGTH[1]), 3)
                bucket_dict["bucket_height"] = round(rn.uniform(BUCKET_HEIGHT[0], BUCKET_HEIGHT[1]), 3)
                bucket_dict["type"] = rn.choice(BUCKET_TYPES)
                bucket_dict["object"] = rn.choice(BUCKET_OBJ_TYPES)
                bucket_dicts_list.append(copy.deepcopy(bucket_dict))

            shelf_layer_dict["buckets"] = bucket_dicts_list
            shelf_layer_dicts_list.append(copy.deepcopy(shelf_layer_dict))
        
        shelf_dict["layers"] = shelf_layer_dicts_list
        shelf_dict_list.append(copy.deepcopy(shelf_dict))


    zone_dict["shelves"] = shelf_dict_list
    zone_dict_list.append(copy.deepcopy(zone_dict))



json_dict["zones"] = zone_dict_list

# Save file
with open(os.path.dirname(__file__) + "/mock_json.json", "w") as json_file:
    json.dump(json_dict, json_file, indent=4)
