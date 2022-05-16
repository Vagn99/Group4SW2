var express = require('express');
var router = express.Router();
var Players = require('../model/playerDB.js');
var GameMap = require('./../model/mapDB');

let players = Players.players;
let gameMap = GameMap.gameMap;


/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.loggedIn) {
        res.render('mapview', {username: req.session.name});
    } else {
        res.redirect('/');
    }
});

router.get('/getValues', function (req, res) {
    // Should send an object with visible values
    res.send(getValues(req, res));
});


// Test route in prep for send troops
router.get('/sendId', function (req, res) {
    // Should send an object with visible values
    res.send(showId(req, res));
});

function showId(req, res) {
    console.log("x=" + req.query.x);
    console.log("y=" + req.query.y);
    console.log("troopsSend=" + req.query.troopsSend);
}

// Test route in prep for send troops
router.get('/sendTroopsToLocation', function (req, res) {
    // Should send an object with visible values
    showId(req, res);
    sendTroopsToLocation(req, res);
    console.log("Done ");
    res.send("Done ");
});

function sendTroopsToLocation(req, res) {
    let timeFactor = 1000;
    let cell = gameMap.cellArray[req.query.x][req.query.y];
    let attackingTroops = Number(req.query.troopsSend);
    let troopsAvailable = players.get(req.session.name).town.troopsInside;
    if (attackingTroops > troopsAvailable || attackingTroops < 0) {
        return 0;
    }

    players.get(req.session.name).town.troopsInside -= attackingTroops;

    let destX = cell.location[0];
    let destY = cell.location[1];
    let startX = players.get(req.session.name).town.locationOnMap[0];
    let startY = players.get(req.session.name).town.locationOnMap[1];

    let deltaX = Math.abs(destX - startX);
    let deltaY = Math.abs(destY - startY);
    let dist;
    deltaX > deltaY ? dist = deltaX : dist = deltaY;

    setTimeout(() => {
        whenArrived(req, res, cell, attackingTroops)
    }, timeFactor * dist);
}

//could use some cleanup
function whenArrived(req, res, cell, attackingTroops) {
    //If the player already owns the tile, it just moves the troops
    if (cell.owner == req.session.name) {
        cell.type.troopsInside += attackingTroops;

    } //If attacking another players city
    else if (cell.type.type == "town") {
        if (cell.type.troopsInside > attackingTroops) {
            cell.type.troopsInside -= attackingTroops;
        } else {
            attackingTroops -= cell.type.troopsInside;
            cell.type.troopsInside = 0;
            if (players.get(cell.type.owner).gold >= attackingTroops) {
                players.get(cell.type.owner).gold -= attackingTroops;
                players.get(req.session.name).gold += attackingTroops;
            } else {
                players.get(req.session.name).gold += players.get(cell.type.owner).gold;
                players.get(cell.type.owner).gold = 0;
            }
        }
    }//If attacking an uncontrolled recourse tile
    else if (cell.type.owner == "") {
        takeControlOfCell(cell, attackingTroops, req, res);
    }//If attacking a recourse tile controlled by another player
    else {
        if (attackingTroops > cell.type.troopsInside) {
            attackingTroops -= cell.type.troopsInside;
            takeControlOfCell(cell, attackingTroops, req, res);
        } else {
            cell.type.troopsInside = cell.type.troopsInside - attackingTroops;

        }

    }
}

function takeControlOfCell(cell, attackingTroops, req, res) {
    console.log("Time to take control");
    if (cell.owner != "") {
        players.get(cell.owner).removeField(cell.type);
    }
    cell.owner = req.session.name;
    players.get(req.session.name).addField(cell.type);
    cell.type.troopsInside = attackingTroops;

}

//some responses
/*
{
    message: "You can't do that",
    victory: false
}
return {
            message: "You own this tile already, moving troops!",
            victory: false
        };
return {
                message: "You stole "+ attackingTroops + " gold from " + cell.type.owner,
                victory: false
            };
return {
                message: "You stole "+ goldText + " gold from " + cell.type.owner,
                victory: false
            };
return {
                message: "You lost, " + cell.type.troopsInside + " troop remaining on " + cell.location,
                victory: false
            };
            return {
        message: "You now control the " + cell.type.type + " at " + cell.location,
        victory: true
    };
 */

// This function should return an object with visible values for start
function getValues(req, res) {
    //Values: All player town hall level, field ownership, (if map approach, then also:
    // field income value, troops on every plot.)
    let player = players.get(req.session.name);
    let mapCreator = [];
    for (let i = 0; i < 9; i++) {
        mapCreator.push([]);
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            mapCreator[i][j] = {};
            mapCreator[i][j].owner = gameMap.cellArray[i][j].owner;
            mapCreator[i][j].troopsInside = gameMap.cellArray[i][j].type.troopsInside;
            mapCreator[i][j].type = gameMap.cellArray[i][j].type.type;
        }
    }
    if (player.town.townHall.lvl >= 10) {
        Players.winner = player.playerName;
    }
    let valueObject = {
        mapObject: mapCreator,
        playerObject: {
            myLevel: player.town.townHall.lvl,
            color: player.color,
            gold: player.gold,
            common: player.resources,
            troops: player.town.troopsInside,
            playerLocation: player.mapCoordinates[0].toString() + player.mapCoordinates[1].toString(),
            user1LVL: gameMap.cellArray[2][0].type.townHall.lvl,
            user2LVL: gameMap.cellArray[0][2].type.townHall.lvl,
            user3LVL: gameMap.cellArray[6][8].type.townHall.lvl,
            user4LVL: gameMap.cellArray[6][2].type.townHall.lvl,
            user5LVL: gameMap.cellArray[8][6].type.townHall.lvl,
            user6LVL: gameMap.cellArray[2][6].type.townHall.lvl,
            winner: Players.winner,

        }
    }
    console.log("Im done! Here's start values ");
    return valueObject;
}

module.exports = router;