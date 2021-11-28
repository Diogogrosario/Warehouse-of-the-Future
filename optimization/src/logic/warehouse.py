import random as r

class Layout:
    def __init__(self, warehouse):
        self.warehouse = warehouse

class Warehouse:
    def __init__(self, shelves):
        self.shelves = shelves # list of Shelves
        
    def getRandomShelf(self):
        return self.shelves[r.randrange(0,len(self.shelves))]

class Shelf:
    def __init__(self, racks):
        self.racks = racks # list of Racks
    
    def getRandomRack(self):
        return self.racks[r.randrange(0,len(self.racks))]

class Piece:
    def __init__(self, id, weight, height):
        self.id = id
        self.weight = weight
        self.height = height

class Rack:
    def __init__(self, length, width, height, y, capacity):
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

class Manifesto:
    def __init__(self, products):
        self.products = products # {id : quantity}