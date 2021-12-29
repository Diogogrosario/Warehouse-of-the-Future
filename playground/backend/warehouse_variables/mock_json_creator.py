'''
This script creates a mock json file in this directory with mock values for variables needed to build the warehouse
'''
import json
import random as rn
import os
import copy


# Variables (tuples with minimum and maximum values)

# Room
ROOM_WIDTH = (15, 25) # Float
ROOM_HEIGHT = (15, 20) # Float
NUM_Z1 = 1 # There is only 1 Z1
NUM_Z2 = 3 
NUM_Z3 = 1 # There is only 1 Z3
NUM_Z4 = 1 # There is only 1 Z4

# Shelf
SHELF_HEIGHT = (2, 4) # Float
SHELF_LENGTH = (1, 3)
SHELF_WIDTH = (1, 3)
NUM_SHELF_LAYERS = (1, 5) # Int

# Shelf layer
BUCKETS_PER_LINE = (1, 4) # Int
BUCKETS_PER_COLUMN = (1, 3) # Int
LAYER_HEIGHT = (1, 3.5) # Float
LAYER_LENGTH = (1, 3) # Float, lower than shelf width

# Bucket
BUCKET_WIDTH = (1, 5) # Float
BUCKET_LENGTH = (1, 3) # Float
BUCKET_HEIGHT = (0.25, 2.5) # Float
BUCKET_TYPES = ["Small", "Regular", "Large"]
BUCKET_OBJ_TYPES = ["Screw_Box"]

# Top zone (Z1)

Z1_WIDTH = (12, 20) # Float, smaller than (ROOM_WIDTH - right_zone_width)
Z1_LENGTH = (1, 3) # Float
NUM_SHELVES_Z1 = (2, 3)

# Side zones (except rightmost, since it is bigger) (Z2)

Z2_WIDTH = (12, 16)
Z2_LENGTH = (1, 3)  # Float
NUM_SHELVES_Z2 = (2, 3)


# Special side zones (Z3)

Z3_WIDTH = (18, 20)
Z3_LENGTH = (1, 3)  # Float
NUM_SHELVES_Z3 = (2, 3)

# Bottom zones (Z3)

Z4_WIDTH = (2, 4)
Z4_LENGTH = (1, 3)  # Float
NUM_SHELVES_Z4 = (1, 2)


def get_zone(i):
    if(i >= NUM_Z1 + NUM_Z2 + NUM_Z3):
        return 4
    if(i >= NUM_Z1 + NUM_Z2):
        return 3
    if(i >= NUM_Z1):
        return 2
    return 1

def get_zone_length(zone_num):
    return [
        Z1_LENGTH,
        Z2_LENGTH,
        Z3_LENGTH,
        Z4_LENGTH,
    ][zone_num - 1]

def get_zone_width(zone_num):
    return [
        Z1_WIDTH,
        Z2_WIDTH,
        Z3_WIDTH,
        Z4_WIDTH,
    ][zone_num - 1]

def get_num_shelves(zone_num):
    return [
        NUM_SHELVES_Z1,
        NUM_SHELVES_Z2,
        NUM_SHELVES_Z3,
        NUM_SHELVES_Z4,
    ][zone_num - 1]

json_dict = {}

room_width = round(rn.uniform(ROOM_WIDTH[0], ROOM_WIDTH[1]), 3)
room_height = round(rn.uniform(ROOM_WIDTH[0], ROOM_WIDTH[1]), 3)


json_dict["room_width"] = room_width
json_dict["room_height"] = room_height



zone_dict_list = []

for i in range(NUM_Z1 + NUM_Z2 + NUM_Z3 + NUM_Z4):
    zone_dict = {}

    zone = get_zone(i)
    zone_width = get_zone_width(zone)
    zone_length = get_zone_length(zone)
    zone_dict["width"] = round(rn.uniform(zone_width[0], zone_width[1]), 3)
    zone_length = round(rn.uniform(zone_length[0], zone_length[1]), 3)
    zone_dict["length"] = zone_length

    shelf_dict_list = []

    num_shelves = get_num_shelves(zone)
    # Fill the shelves with values
    for shelf in range(rn.randint(num_shelves[0], num_shelves[1])):
        shelf_dict = {}
        shelf_length = round(rn.uniform(SHELF_LENGTH[0], min(SHELF_LENGTH[1], zone_length)), 3)
        shelf_height = round(rn.uniform(SHELF_HEIGHT[0], SHELF_HEIGHT[1]), 3)
        shelf_dict["shelf_length"] = shelf_length
        shelf_dict["shelf_height"] = shelf_height
        shelf_dict["shelf_width"] = round(rn.uniform(SHELF_WIDTH[0], SHELF_WIDTH[1]), 3)
        num_shelf_layers = rn.randint(NUM_SHELF_LAYERS[0], NUM_SHELF_LAYERS[1])

        cumulative_layer_height = 0
        shelf_layer_dicts_list = []

        # Fill the shelf's layers with values
        for j in range(num_shelf_layers):
            shelf_layer_dict = {}
            buckets_per_line = rn.randint(BUCKETS_PER_LINE[0], BUCKETS_PER_LINE[1])
            buckets_per_col = rn.randint(BUCKETS_PER_COLUMN[0], BUCKETS_PER_COLUMN[1])
            num_buckets = buckets_per_line * buckets_per_col
            layer_length = round(rn.uniform(LAYER_LENGTH[0], min(LAYER_LENGTH[1], shelf_length)), 3)
            layer_height = round(rn.uniform(LAYER_HEIGHT[0], min(LAYER_HEIGHT[1], shelf_height)), 3)
            cumulative_layer_height += layer_height
            shelf_layer_dict["buckets_per_line"] = buckets_per_line
            shelf_layer_dict["buckets_per_column"] = buckets_per_col
            shelf_layer_dict["layer_length"] = layer_length
            shelf_layer_dict["layer_height"] = layer_height

            cumulative_bucket_width = 0
            cumulative_bucket_length = 0
            bucket_dicts_list = []
            for k in range(num_buckets):
                bucket_dict = {}
                bucket_width = round(rn.uniform(BUCKET_WIDTH[0], BUCKET_WIDTH[1]), 3)
                bucket_length = round(rn.uniform(BUCKET_LENGTH[0], BUCKET_LENGTH[1]), 3)
                cumulative_bucket_width += bucket_width
                cumulative_bucket_length += bucket_length
                bucket_dict["bucket_width"] = bucket_width
                bucket_dict["bucket_length"] = bucket_length
                bucket_dict["bucket_height"] = round(rn.uniform(BUCKET_HEIGHT[0], min(BUCKET_HEIGHT[1], layer_height)), 3)
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


# Some valid room verifications

# Standardize heights
# For each zone
for i in range(0, NUM_Z1 + NUM_Z2 + NUM_Z3 + NUM_Z4):

    # A shelf can't be taller than the room
    for j in range(len(json_dict["zones"][i]["shelves"])):
        if json_dict["zones"][i]["shelves"][j]["shelf_height"] > json_dict["room_height"]:
            json_dict["zones"][i]["shelves"][j]["shelf_height"] = json_dict["room_height"]
        
        #A shelf has to be at least as tall as it's layers, summed
        cumulative_layer_height = 0
        for l in range(len(json_dict["zones"][i]["shelves"][j]["layers"])):
            cumulative_layer_height += json_dict["zones"][i]["shelves"][j]["layers"][l]["layer_height"]
        if cumulative_layer_height > json_dict["zones"][i]["shelves"][j]["shelf_height"]:
            h_ratio = cumulative_layer_height / json_dict["zones"][i]["shelves"][j]["shelf_height"]
            for l in range(len(json_dict["zones"][i]["shelves"][j]["layers"])):
                new_val = json_dict["zones"][i]["shelves"][j]["layers"][l]["layer_height"] * h_ratio
                json_dict["zones"][i]["shelves"][j]["layers"][l]["layer_height"] = new_val

        # A bucket can't be taller than it's shelf
        for l in range(len(json_dict["zones"][i]["shelves"][j]["layers"])):
            for m in range(len(json_dict["zones"][i]["shelves"][j]["layers"][l]["buckets"])):
                if json_dict["zones"][i]["shelves"][j]["layers"][l]["buckets"][m]["bucket_height"] > json_dict["zones"][i]["shelves"][j]["layers"][l]["layer_height"]:
                    json_dict["zones"][i]["shelves"][j]["layers"][l]["buckets"][m]["bucket_height"] = json_dict["zones"][i]["shelves"][j]["layers"][l]["layer_height"]


# Standardize lenghts and widths
for i in range(0, NUM_Z1 + NUM_Z2 + NUM_Z3 + NUM_Z4):
    zone_length = json_dict["zones"][i]["length"]
    for j in range(len(json_dict["zones"][i]["shelves"])):
        shelf_width = json_dict["zones"][i]["shelves"][j]["shelf_width"]
        shelf_length = json_dict["zones"][i]["shelves"][j]["shelf_length"]
        ## A shelf cannot be longer than it's zone
        if shelf_length > zone_length:
            shelf_length = zone_length
            json_dict["zones"][i]["shelves"][j]["shelf_length"] = shelf_length

        for l in range(len(json_dict["zones"][i]["shelves"][j]["layers"])):
            # The sum of each bucket's width, for every bucket in the same line, cannot be higher than it's shelf's (assumed that layers have the same width as their shelfs)
            for m in range(json_dict["zones"][i]["shelves"][j]["layers"][l]["buckets_per_column"]):
                bpl = json_dict["zones"][i]["shelves"][j]["layers"][l]["buckets_per_line"]
                cumulative_width = 0
                for n in range(bpl):
                    cumulative_width += json_dict["zones"][i]["shelves"][j]["layers"][l]["buckets"][n + m * bpl]["bucket_width"]
                if(cumulative_width > shelf_width):
                    ratio = cumulative_width / shelf_width
                    for n in range(bpl):
                        new_val = json_dict["zones"][i]["shelves"][j]["layers"][l]["buckets"][n + m * bpl]["bucket_width"] / ratio
                        json_dict["zones"][i]["shelves"][j]["layers"][l]["buckets"][n + m * bpl]["bucket_width"] = new_val

            # The sum of each bucket's length, for every bucket in the same column, cannot be higher than it's shelf's layer's
            layer_length = json_dict["zones"][i]["shelves"][j]["layers"][l]["layer_length"]
            for m in range(json_dict["zones"][i]["shelves"][j]["layers"][l]["buckets_per_line"]):
                bpc = json_dict["zones"][i]["shelves"][j]["layers"][l]["buckets_per_column"]
                bpl = json_dict["zones"][i]["shelves"][j]["layers"][l]["buckets_per_line"]
                cumulative_length = 0
                for n in range(bpc):
                    cumulative_length += json_dict["zones"][i]["shelves"][j]["layers"][l]["buckets"][n * bpl + m]["bucket_length"]
                if(cumulative_length > layer_length):
                    ratio = cumulative_length / shelf_length
                    for n in range(bpc):
                        new_val = json_dict["zones"][i]["shelves"][j]["layers"][l]["buckets"][n * bpl + m]["bucket_length"] / ratio
                        json_dict["zones"][i]["shelves"][j]["layers"][l]["buckets"][n * bpl + m]["bucket_length"] = new_val





# Save file
with open(os.path.dirname(__file__) + "/mock_json.json", "w") as json_file:
    json.dump(json_dict, json_file, indent=4)
