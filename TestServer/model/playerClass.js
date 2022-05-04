var startValues = require('./startValues.js');

class Player {

    #id;
    #playerName;
    #town;
    #mapCoordinates;
    #resources;
    #resourcesPerSec;
    #gold;
    #goldPerSec = 0;
    #color;
    #controlledResources;

    constructor(id, playerName, townName, x, y, color) {
        this.#playerName = playerName;
        this.#id = id;
        this.#town = new Town(playerName, id, townName, x, y);
        this.#mapCoordinates = [x, y];
        this.#resources = startValues.startCommon;
        this.#resourcesPerSec = this.town.baseField.resourcesPerSec;
        this.#gold = startValues.startGold;
        this.#color = color;
        this.#controlledResources = new Map;
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
    get resources() {
        return this.#resources;
    }
    set resources(value) {
        this.#resources = value;
    }
    get gold() {
        return this.#gold;
    }
    set gold(value) {
        this.#gold = value;
    }
    get color() {
        return this.#color;
    }
    set color(value) {
        this.#color = value;
    }
    get resourcesPerSec() {
        return this.#resourcesPerSec;
    }
    set resourcesPerSec(value) {
        this.#resourcesPerSec = value;
    }
    get goldPerSec() {
        return this.#goldPerSec;
    }
    set goldPerSec(value) {
        this.#goldPerSec = value;
    }
    get controlledResources() {
        return this.#controlledResources;
    }
    get mapCoordinates() {
        return this.#mapCoordinates;
    }
    set mapCoordinates(value) {
        this.#mapCoordinates = value;
    }

    addField(field){
        this.controlledResources.set(field.locationOnMap[0].toString() + field.locationOnMap[1].toString(),field);
        if (field.type == "common") {
            this.resourcesPerSec = this.resourcesPerSec + field.resourcesPerSec;
        } else if (field.type == "gold"){
            this.goldPerSec = this.goldPerSec + field.resourcesPerSec;
        }
    }
    removeField(field){
        this.controlledResources.delete(field.locationOnMap[0].toString() + field.locationOnMap[1].toString());
        if (field.type == "common") {
            this.resourcesPerSec = this.resourcesPerSec - field.resourcesPerSec;
        } else if (field.type == "gold"){
            this.goldPerSec = this.goldPerSec - field.resourcesPerSec;
        }
    }




    generateIncome(){
        setInterval(()=>{
            this.resources = this.resources + this.resourcesPerSec;
            this.gold = this.gold + this.goldPerSec;
        },1000)
    }
}

class Town {

    #id;
    #owner;
    #townName;
    #troopsInside;
    #locationOnMap;
    #townHall;
    #baseField;
    #barracks;
    #type = "town";
    _visibleText = "Hello world";

    constructor(playerName, id, townName, x, y) {
        this.#id = id;
        this.#owner = playerName;
        this.#townName = townName;
        this.#troopsInside = startValues.startTroopsPlayers;
        this.#locationOnMap = [x, y];
        this.#townHall = new TownHall();
        this.#baseField = new BaseField();
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
    get visibleText() {
        return this._visibleText;
    }
    set visibleText(value) {
        this._visibleText = value;
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
    }
}

class Building {

    #lvl;
    #name;
    #upgradeCost = [0,0];
    #upgradeTime = 0;
    #busy = false;

    constructor(name) {
        this.#lvl = 0;
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
    get upgradeCost() {
        return this.#upgradeCost;
    }
    set upgradeCost(value) {
        this.#upgradeCost = value;
    }
    get upgradeTime() {
        return this.#upgradeTime;
    }
    set upgradeTime(value) {
        this.#upgradeTime = value;
    }
    get busy() {
        return this.#busy;
    }
    set busy(value) {
        this.#busy = value;
    }

    upgradeBuilding(player){
        if (this.busy){
            return "Already in use";
        } else {
            if (player.resources >= this.upgradeCost[0] && player.gold >= this.upgradeCost[1]) {
                this.busy = true;
                player.resources = player.resources - this.upgradeCost[0];
                player.gold = player.gold - this.upgradeCost[1];
                setTimeout(() => {
                    this.upgradeCost[0] = this.upgradeCost[0] + startValues.upgradeTownHallCostIncreaseCommon;
                    this.upgradeCost[1] = this.upgradeCost[1] + startValues.upgradeTownHallCostIncreaseGold;
                    this.lvl = this.lvl + 1;
                    this.busy = false;
                }, this.upgradeTime * 1000)
                return this.upgradeTime.toString();
            } else {
                return "Not enough resources!";
            }
        }
    }
}

class TownHall extends Building {
    constructor() {
        super('Town Hall');
        this.upgradeCost = startValues.startTownHallUpgradeCost;
        this.upgradeTime = startValues.startTownHallUpgradeTime;
    }
}

class BaseField extends Building {
    #resourcesPerSec;

    constructor() {
        super('Base Field');
        this.#resourcesPerSec = startValues.startCommonIncome;
    }

    get resourcesPerSec() {
        return this.#resourcesPerSec;
    }
    set resourcesPerSec(value) {
        this.#resourcesPerSec = value;
    }
}

class Barracks extends Building {

    #trainingTime = startValues.startTroopTrainingTime*10;
    #queue = 0;
    #barrackInUse = false;
    #trainingTimeLeft = 0;
    #trainingCost;

    constructor() {
        super('Barracks');
        this.#trainingCost = startValues.startTroopsCost;
    }
    get queue() {
        return this.#queue;
    }
    set queue(value) {
        this.#queue = value;
    }
    get barrackInUse() {
        return this.#barrackInUse;
    }
    set barrackInUse(value) {
        this.#barrackInUse = value;
    }
    get trainingTime() {
        return this.#trainingTime;
    }
    set trainingTime(value) {
        this.#trainingTime = value;
    }
    get trainingTimeLeft() {
        return this.#trainingTimeLeft;
    }
    set trainingTimeLeft(value) {
        this.#trainingTimeLeft = value;
    }
    get trainingCost() {
        return this.#trainingCost;
    }
    set trainingCost(value) {
        this.#trainingCost = value;
    }

    newTrainTroops(town){
        console.log("Starting trainNewTroop ")
        this.queue = this.queue + 1;
        if (!this.barrackInUse){
            this.trainNextTroop(town);
        } else {
            console.log("Queue added!")
        }
    }

    trainNextTroop(town){
        console.log("Actually training");
        this.barrackInUse = true;
        this.trainingTimeLeft = this.trainingTime;
        let trainTimer = setInterval(()=>{
            if (this.trainingTimeLeft===6) {
                clearInterval(trainTimer);
                // increase troops by 1 ;
                town.troopsInside = town.troopsInside + 1;
                this.barrackInUse = false;
                console.log("Trained a troop! Troops are now: " + town.troopsInside);
                this.queue = this.queue - 1;
                if (this.queue > 0) {
                    this.trainNextTroop(town);
                }
            } else {
                this.trainingTimeLeft--;
            }
        },100);
    }


}

module.exports = {
    Player,
}