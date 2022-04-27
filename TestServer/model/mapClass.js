
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
        this.cellArray[2][0].type = type[0];
        this.cellArray[0][2].type = type[1];
        this.cellArray[6][8].type = type[2];
        this.cellArray[6][2].type = type[3];
        this.cellArray[8][6].type = type[4];
        this.cellArray[2][6].type = type[5];

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
        //Still needs cases for the towns... perhaps, maybe, I dont know
        switch (x.toString() + y.toString()){
            case "00": case "40": case "33": case "43": case "04": case "34":
            case "54": case "84": case "45": case "55": case "48": case "88":
                this.#type = new ResourceField(1, "common",x,y);
                break;
            case "22": case "42": case "24": case "44": case "64": case "46": case "66":
                this.#type = new ResourceField(1, "gold",x,y);
                break;
            default:
                this.#type = new ResourceField(0, type, x, y);
        }
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
        this.type.owner = value;
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
    #troopsInside = 0;
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
    get troopsInside() {
        return this.#troopsInside;
    }
    set troopsInside(value) {
        this.#troopsInside = value;
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