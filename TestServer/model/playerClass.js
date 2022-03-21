class Player {
    #id;
    #town;
    #map;
    #playerName;
    constructor(id, playerName, townName, x, y){
        this.#playerName = playerName;
        this.#id = id;
        this.#town = new Town(id, townName, x, y);
        this.#map = new Map(x, y);
    }
}

class Town {
    #id;
    #name;
    #troopsInside;
    #locationOnMap;
    #townHall;
    #baseField;
    #barracks;
    constructor(id, name, x, y){
        this.#id = id;
        this.#name = name;
        this.#troopsInside = 0;
        this.#locationOnMap = [x,y];
        this.#townHall = new Townhall();
        this.#baseField = new Basefield();
        this.#barracks = new Barracks();
    }
}

class Map {
    #myTown;
    #occupiedPlots;
    constructor(x,y){
        this.#myTown = [x,y];
        this.#occupiedPlots = [];//will contain objects
    }
}

class Building {
    #lvl;
    #name;
    constructor(name){
        this.#lvl = 1;
        this.#name = name;
    }
}

class Townhall extends Building{
    constructor(){
        super('Townhall');
    }
}

class Basefield extends Building{
    #resourcePerSec;
    constructor(){
        super('Basefield');
        this.#resourcePerSec = 1;
    } 
}

class Barracks extends Building{
    constructor(){
        super('Barracks');
    }  
}