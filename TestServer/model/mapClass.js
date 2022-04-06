class GameMap {

    #cellArray = [];

    constructor(x, y, type) {
        for (let k = 0; k < x; k++) {
            this.#cellArray.push([]);
        }
        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                if(i<Math.ceil(y/2)) {
                    if (j < i + Math.ceil(y / 2)) {
                        this.#cellArray[i][j] = new Cell(i, j, "");
                    } else {
                        this.#cellArray[i][j] = new EmptyCell(i, j);
                    }
                } else {
                    if (j<i-Math.floor(y/2)){
                        this.#cellArray[i][j] = new EmptyCell(i, j);
                    } else {
                        this.#cellArray[i][j] = new Cell(i, j, "");
                    }
                }
            }
        }
        //Assigns towns to map location
        this.cellArray[Math.floor(x/4)][0].type = type[0];
        this.cellArray[0][Math.floor(y/4)].type = type[1];
        this.cellArray[Math.floor(x/1.5)][y-1].type = type[2];
        this.cellArray[Math.floor(x/1.5)][Math.floor(y/4)].type = type[3];
        this.cellArray[x-1][Math.floor(y/1.5)].type = type[4];
        this.cellArray[Math.floor(x/4)][Math.floor(y/1.5)].type = type[5];

        //Assign resource fields
        // !!!Make switch or something like that here!!!
        //Common: 0,0 - 4,0 - 3,3 - 4,3 - 0,4 - 3,4 - 5,4 - 8,4 - 4,5 - 5,5 - 4,8 - 8,8
        //Gold: 2,2 - 4,2 - 2,4 - 4,4 - 6,4 - 4,6 - 6,6
        this.cellArray[0][0].type = new ResourceField(1, "common",0,0);
        this.cellArray[4][0].type = new ResourceField(1, "common",4,0);
        this.cellArray[3][3].type = new ResourceField(1, "common",3,3);
        this.cellArray[4][3].type = new ResourceField(1, "common",4,3);
        this.cellArray[0][4].type = new ResourceField(1, "common",0,4);
        this.cellArray[3][4].type = new ResourceField(1, "common",3,4);
        this.cellArray[5][4].type = new ResourceField(1, "common",5,4);
        this.cellArray[8][4].type = new ResourceField(1, "common",8,4);
        this.cellArray[4][5].type = new ResourceField(1, "common",4,5);
        this.cellArray[5][5].type = new ResourceField(1, "common",5,5);
        this.cellArray[4][8].type = new ResourceField(1, "common",4,8);
        this.cellArray[8][8].type = new ResourceField(1, "common",8,8);

        this.cellArray[2][2].type = new ResourceField(1, "gold",2,2);
        this.cellArray[4][2].type = new ResourceField(1, "gold",4,2);
        this.cellArray[2][4].type = new ResourceField(1, "gold",2,4);
        this.cellArray[4][4].type = new ResourceField(1, "gold",4,4);
        this.cellArray[6][4].type = new ResourceField(1, "gold",6,4);
        this.cellArray[4][6].type = new ResourceField(1, "gold",4,6);
        this.cellArray[6][6].type = new ResourceField(1, "gold",6,6);

    }

    get cellArray() {
        return this.#cellArray;
    }
    set cellArray(value) {
        this.#cellArray = value;
    }

}

class Cell {
    #location;
    #owner;
    #type;
    constructor(x, y, owner, type) {
        this.#location = [x, y];
        this.#type = new ResourceField(1, type, x, y);
        this.#owner = "";

    }

    get location() {
        return this.#location;
    }
    set location(value) {
        this.#location = value;
    }
    get owner() {
        return this.#owner;
    }
    set owner(value) {
        this.#owner = value;
    }
    get type() {
        return this.#type;
    }
    set type(value) {
        this.#type = value;
        this.owner = value.owner;
        this.type.locationOnMap = this.location;
    }
}

class EmptyCell {
    #location;
    #owner = "This cell is empty and should not be accessed";
    #type = "This cell is empty and should not be accessed";
    constructor(x, y) {
        this.#location = [x, y];
    }

    get location() {
        return this.#location;
    }
    set location(value) {
        this.#location = value;
    }
    get owner() {
        return this.#owner;
    }
    /*set owner(value) {
        this.#owner = value;
    }*/
    get type() {
        return this.#type;
    }
    /*set type(value) {
        this.#type = value;
    }*/
}

class ResourceField {

    #resourcesPerSec;
    #type;
    #troopsOnLocation = 0;
    #owner = "";
    #locationOnMap = [];

    constructor(resourcesPerSec, type, x, y) {
        if (type === "gold" || type === "common"){
            this.#type = type;
            this.#resourcesPerSec = resourcesPerSec;
            this.#locationOnMap = [x,y];
        } else {
            this.#type = "empty";
            this.#resourcesPerSec = 0;
            this.#locationOnMap = [x,y];
        }
    }

    get resourcesPerSec() {
        return this.#resourcesPerSec;
    }
    set resourcesPerSec(value) {
        this.#resourcesPerSec = value;
    }
    get type() {
        return this.#type;
    }
    set type(value) {
        this.#type = value;
    }
    get troopsOnLocation() {
        return this.#troopsOnLocation;
    }
    set troopsOnLocation(value) {
        this.#troopsOnLocation = value;
    }
    get owner() {
        return this.#owner;
    }
    set owner(value) {
        this.#owner = value;
    }
    get locationOnMap() {
        return this.#locationOnMap;
    }
    set locationOnMap(value) {
        this.#locationOnMap = value;
    }
}


module.exports = {
    GameMap,
}