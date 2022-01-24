
import json
import os


json_dict = {}



json_dict["dimensions"] = dict()
json_dict["dimensions"]["width"] = 14
json_dict["dimensions"]["depth"] = 15
json_dict["dimensions"]["height"] = 6

shelves = []

def add_levels(height, bucketType):
    levels = []
    for i in range(0, height):
        lvl = dict()
        lvl["height"] = i
        lvl["bucketType"] = bucketType
        levels.append(lvl)
    return levels

for i in range(0, 14, 2):
    shelf_dict = dict()
    shelf_dict["orientation"] = "south"
    shelf_dict["x"] = i
    shelf_dict["z"] = 0
    shelf_dict["width"] = 2
    shelf_dict["depth"] = 1
    shelf_dict["height"] = 4
    shelf_dict["levels"] = add_levels(4, "regular")
    shelves.append(shelf_dict)

shelf_dict = dict()
shelf_dict["orientation"] = "north"
shelf_dict["x"] = 0
shelf_dict["z"] = 5
shelf_dict["width"] = 2
shelf_dict["depth"] = 1
shelf_dict["height"] = 4
shelf_dict["levels"] = add_levels(4, "regular")
shelves.append(shelf_dict)

for i in range(5, 15, 2):
    shelf_dict = dict()
    shelf_dict["orientation"] = "east"
    shelf_dict["x"] = 2
    shelf_dict["z"] = i
    shelf_dict["width"] = 2
    shelf_dict["depth"] = 1
    shelf_dict["height"] = 4
    shelf_dict["levels"] = add_levels(4, "regular")
    shelves.append(shelf_dict)

for i in range(5, 15, 2):
    shelf_dict = dict()
    shelf_dict["orientation"] = "west"
    shelf_dict["x"] = 7
    shelf_dict["z"] = i
    shelf_dict["width"] = 2
    shelf_dict["depth"] = 1
    shelf_dict["height"] = 4
    shelf_dict["levels"] = add_levels(4, "regular")
    shelves.append(shelf_dict)

for i in range(5, 15, 2):
    shelf_dict = dict()
    shelf_dict["orientation"] = "east"
    shelf_dict["x"] = 8
    shelf_dict["z"] = i
    shelf_dict["width"] = 2
    shelf_dict["depth"] = 1
    shelf_dict["height"] = 4
    shelf_dict["levels"] = add_levels(4, "regular")
    shelves.append(shelf_dict)

for i in range(5, 15, 2):
    shelf_dict = dict()
    shelf_dict["orientation"] = "west"
    shelf_dict["x"] = 13
    shelf_dict["z"] = i
    shelf_dict["width"] = 2
    shelf_dict["depth"] = 1
    shelf_dict["height"] = 4
    shelf_dict["levels"] = add_levels(4, "regular")
    shelves.append(shelf_dict)

json_dict["shelves"] = shelves

lights = []

light_dict = dict()
light_dict["x"] = 4
light_dict["y"] = 7.9
light_dict["z"] = 10
lights.append(light_dict)

light_dict = dict()
light_dict["x"] = 10
light_dict["y"] = 7.9
light_dict["z"] = 10
lights.append(light_dict)

light_dict = dict()
light_dict["x"] = 4
light_dict["y"] = 7.9
light_dict["z"] = 2
lights.append(light_dict)

light_dict = dict()
light_dict["x"] = 9
light_dict["y"] = 7.9
light_dict["z"] = 2
lights.append(light_dict)

json_dict["lights"] = lights

# Save file
with open(os.path.dirname(__file__) + "/mock_json.json", "w") as json_file:
    json.dump(json_dict, json_file, indent=4)