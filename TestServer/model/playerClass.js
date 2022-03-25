class Player {
    #id;
    #playerName;
    #town;
    #map;
    #resources;
    #gold;

    constructor(id, playerName, townName, x, y) {
        this.#playerName = playerName;
        this.#id = id;
        this.#town = new Town(id, townName, x, y);
        this.#map = new Map(x, y);
        this.#resources = 10;
        this.#gold = 0;
    }

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }
    get playerName() {
        return this.#playerName;
    }
    set playerName(value) {
        this.#playerName = value;
    }
    get town() {
        return this.#town;
    }
    set town(value) {
        this.#town = value;
    }
    get map() {
        return this.#map;
    }
    set map(value) {
        this.#map = value;
    }
    get resources() {
        return this.#resources;
    }
    set resources(value) {
        this.#resources = value;
    }
}

class Town {
    #id;
    #townName;
    #troopsInside;
    #locationOnMap;
    #townHall;
    #baseField;
    #barracks;

    constructor(id, townName, x, y) {
        this.#id = id;
        this.#townName = townName;
        this.#troopsInside = 0;
        this.#locationOnMap = [x, y];
        this.#townHall = new Townhall();
        this.#baseField = new Basefield();
        this.#barracks = new Barracks();
    }

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }
    get townName() {
        return this.#townName;
    }
    set townName(value) {
        this.#townName = value;
    }
    get troopsInside() {
        return this.#troopsInside;
    }
    set troopsInside(value) {
        this.#troopsInside = value;
    }
    get locationOnMap() {
        return this.#locationOnMap;
    }
    set locationOnMap(value) {
        this.#locationOnMap = value;
    }
    get townHall() {
        return this.#townHall;
    }
    get baseField() {
        return this.#baseField;
    }
    get barracks() {
        return this.#barracks;
    }
}

class Map {
    #myTownLocation;
    #occupiedPlots;

    constructor(x, y) {
        this.#myTownLocation = [x, y];
        this.#occupiedPlots = [];//will contain objects
    }

    get myTownLocation() {
        return this.#myTownLocation;
    }
    set myTownLocation(value) {
        this.#myTownLocation = value;
    }
    get occupiedPlots() {
        return this.#occupiedPlots;
    }
    set occupiedPlots(value) {
        this.#occupiedPlots = value;
    }
}

class Building {
    #lvl;
    #name;

    constructor(name) {
        this.#lvl = 1;
        this.#name = name;
    }

    get name() {
        return this.#name;
    }
    set name(value) {
        this.#name = value;
    }
    get lvl() {
        return this.#lvl;
    }
    set lvl(value) {
        this.#lvl = value;
    }
}

class Townhall extends Building {
    constructor() {
        super('Townhall');
    }
}

class Basefield extends Building {
    #resourcePerSec;

    constructor() {
        super('Basefield');
        this.#resourcePerSec = 1;
    }

    get resourcePerSec() {
        return this.#resourcePerSec;
    }
    set resourcePerSec(value) {
        this.#resourcePerSec = value;
    }
}

class Barracks extends Building {
    #trainingTime = 5;
    constructor() {
        super('Barracks');
    }

    get trainingTime() {
        return this.#trainingTime;
    }
    set trainingTime(value) {
        this.#trainingTime = value;
    }

    /* For some reason will not work */
    trainTroops(resources, troops) {
        let cost = 1;
        if (resources >= cost) {
            resources = resources - cost;
            troops++;
        } else {
            return {message: "Not enough resources",
                troops: troops,
                resources: resources,
                trainingTime: this.trainingTime}
        }
        return {message: "Troop trained, you have " + troops + " troops in town",
            troops: troops,
            resources: resources,
            trainingTime: this.trainingTime};
    }


}

module.exports = {
    Player,
    /*Town,
    Building,
    Townhall,
    Basefield,
    Barracks*/
}