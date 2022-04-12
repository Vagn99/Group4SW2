var express = require('express');
var router = express.Router();
var Players = require('./../model/userDB.js');
var GameMap = require('./../model/mapDB');

let players = Players.players;
let gameMap = GameMap.gameMap;


/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.loggedIn){
        res.render('mapview');
    } else {
        res.redirect('/');
    }
});

router.get('/start', function (req,res){
    // Should send an object with visible values
    res.send(getStartValues());
});

router.get('/update', function (req,res){
    // Should send an object with visible values
    res.send(getUpdateValues());
});


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



module.exports = router;