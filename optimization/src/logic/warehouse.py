import random as r

class Layout:
    def __init__(self, warehouse):
        self.warehouse = warehouse

class Warehouse:
    def __init__(self, id):
        self.id = id
        self.shelves = [] # list of Shelves
    
    def add_shelf(self, shelf):
        self.shelves.append(shelf)

    def getRandomShelf(self):
        return self.shelves[r.randrange(0,len(self.shelves))]

    def __str__(self) -> str:
        state = ""
        state += f'WAREHOUSE ID: {self.id}\n'
        for shelf in self.shelves:
            state += f'\t{shelf}\n'
        return state

class Shelf:
    def __init__(self, id):
        self.id = id
        self.racks = [] # list of Racks
    
    def add_rack(self, rack):
        self.racks.append(rack)

    def getRandomRack(self):
        return self.racks[r.randrange(0,len(self.racks))]

    def __str__(self) -> str:
        state = ""
        state += f'SHELF {self.id}:\n'
        for rack in self.racks:
            state += f'\t\t{rack}\n'
        return state

class Product:
    def __init__(self, id, weight, height):
        self.id = id
        self.weight = weight
        self.height = height

class Rack:
    def __init__(self, id, length, width, height, y, capacity):
        self.id = id
        self.length = length
        self.width = width
        self.height = height
        self.y = y
        self.capacity = capacity
        self.pieces = [] # list of Pieces
    
    def addPiece(self, piece):
        self.pieces.append(piece)
        
    def removePiece(self, piece):
        self.pieces.remove(piece)
    
    def removePieceId(self, id):
        # change this later
        for piece in self.pieces:
            if piece.id == id:
                self.pieces.remove(id)
                break

    def __str__(self) -> str:
        state = ""
        state += f'RACK {self.id}:\n'
        state += f'\t\t\tLENGTH: {self.length}\n'
        state += f'\t\t\tWIDTH: {self.width}\n'
        state += f'\t\t\tHEIGHT: {self.height}\n'
        state += f'\t\t\tY: {self.y}\n'
        state += f'\t\t\tCAPACITY: {self.capacity}\n'
        return state

class Manifesto:
    def __init__(self, products):
        self.products = products # {id : quantity}