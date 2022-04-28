var express = require('express');
var router = express.Router();
var Players = require('../model/playerDB.js');
var GameMap = require('./../model/mapDB');

let players = Players.players;
let gameMap = GameMap.gameMap;


/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.loggedIn){
        res.render('mapview', {username: req.session.name});
    } else {
        res.redirect('/');
    }
});

router.get('/playerdata', function (req,res){
    // Should send an object with visible values
    res.send(getPlayer(req, res));
});

router.get('/start', function (req,res){
    // Should send an object with visible values
    res.send(getStartValues());
});

router.get('/update', function (req,res){
    // Should send an object with visible values
    res.send(getUpdateValues());
});


// Test route in prep for send troops
router.get('/sendId', function (req,res){
    // Should send an object with visible values
    res.send(showId(req,res));
});

function showId(req,res){
    console.log("x="+req.query.x);
    console.log("y="+req.query.y);
}

// Test route in prep for send troops
router.get('/sendTroopsToLocation', function (req,res){
    // Should send an object with visible values
    res.send(sendTroopsToLocation(req,res));
});

function sendTroopsToLocation(req,res){
    let cell = gameMap.cellArray[req.query.x][req.query.y];
    let attackingTroops = Number(req.query.troopsSend);
    players.get(req.session.name).town.troopsInside -= attackingTroops;
    //if uncontrolled
    if (cell.owner==""){
        takeControlOfCell(cell, attackingTroops, req, res);
    } //if controlled by another player
    else {
        if (attackingTroops>cell.type.troopsInside){
            attackingTroops -= cell.type.troopsInside;
            takeControlOfCell(cell, attackingTroops, req, res);
        } else {
            cell.type.troopsInside = cell.type.troopsInside - attackingTroops;
        }

    }
}
//Still needs a function in player calls to handle changes in income
function takeControlOfCell(cell, attackingTroops, req, res){
    players.get(cell.owner).removeField(cell.type);
    cell.owner = req.session.name;
    players.get(req.session.name).addField(cell.type);
    cell.type.troopsInside = attackingTroops;
}

// This function should return an object with visible values for start
function getStartValues(){
    //Values: All player town hall level, field ownership, (if map approach, then also:
    // field income value, troops on every plot.)
    let mapObject = [[]];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            mapObject[i][j].cell = {};
            mapObject[i][j].cell.owner = gameMap.cellArray[i][j].owner;
            mapObject[i][j].cell.troopsInside = gameMap.cellArray[i][j].type.troopsInside;
            if (gameMap.cellArray[i][j].type.type == "town"){
                mapObject[i][j].cell.townHallLVL = gameMap.cellArray[i][j].type.townHall.lvl;
            } else if (gameMap.cellArray[i][j].type.type == "common" || gameMap.cellArray[i][j].type.type == "gold"){
                mapObject[i][j].cell.resourcesPerSec = gameMap.cellArray[i][j].type.resourcesPerSec;
            }

        }
    }

    return mapObject;
}

// This function should return an object with visible values for update
function getUpdateValues(){
    //Values: All player town hall level, toops inside, ownership
    let mapObject = [[]];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            mapObject[i][j].cell = {};
            mapObject[i][j].cell.owner = gameMap.cellArray[i][j].owner;
            mapObject[i][j].cell.troopsInside = gameMap.cellArray[i][j].type.troopsInside;
            if (gameMap.cellArray[i][j].type.type == "town"){
                mapObject[i][j].cell.townHallLVL = gameMap.cellArray[i][j].type.townHall.lvl;
            } else if (gameMap.cellArray[i][j].type.type == "common" || gameMap.cellArray[i][j].type.type == "gold"){
                mapObject[i][j].cell.resourcesPerSec = gameMap.cellArray[i][j].type.resourcesPerSec;
            }

        }
    }

    return mapObject;
}

function troopsInside(x, y){
    return gameMap.cellArray[x][y].type.troopsInside;
}

function getOwnership(x, y){
    return gameMap.cellArray[x][y].type.owner;
}

function getPlayer(req, res){
    console.log(req.session.name);
    console.log(players.get('user1').playerName);
    let player = players.get(req.session.name);
    return {
        gold: player.gold,
        common: player.resources,
        troops: player.town.troopsInside
        //cords: {x: player.mapCoordinates[0], y: player.mapCoordinates[1]}
    }
}

module.exports = router;