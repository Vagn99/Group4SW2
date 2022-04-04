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
        this.cellArray[0][0].type = type[0];
        this.cellArray[0][Math.floor(y/2)].type = type[1];
        this.cellArray[Math.floor(y/2)][y-1].type = type[2];
        this.cellArray[y-1][y-1].type = type[3];
        this.cellArray[y-1][Math.floor(y/2)].type = type[4];
        this.cellArray[Math.floor(y/2)][0].type = type[5];
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
        if (typeof(type)==="object"){
            this.#type = type;
            this.#owner = type.owner;
            this.type.locationOnMap = this.location;
        } else {
            this.#type = new ResourceField(5, type);
            this.#owner = "";
        }
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
        if (typeof(value)==="object"){
            this.#type = value;
            this.owner = value.owner;
            this.type.locationOnMap = this.location;
        } else {
            this.#type = value;
        }

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

    constructor(resourcesPerSec, type) {
        this.#resourcesPerSec = resourcesPerSec;
        if (type === "gold" || type === "common"){
            this.#type = type;
        } else {
            this.#type = "empty";
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
}


module.exports = {
    GameMap,
}