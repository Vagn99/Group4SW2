var express = require('express');
var router = express.Router();
var Players = require('../model/playerDB.js');
var GameMap = require('./../model/mapDB');

let players = Players.players;
let gameMap = GameMap.gameMap;

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.loggedIn){
        res.render('cityview');
    } else {
        res.redirect('/');
    }
});

router.get('/start', function (req, res){
    // Should send an object with visible values
    res.send(getStartValues(req,res));
});

router.get('/update', function (req, res){
    // Should send an object with visible values
    res.send(getUpdateValues(req,res));
});

router.get('/upgradeTownHall', function (req, res){
    res.send((req,res)=>{
        let player = players.get(req.session.name);
        let upgradeResponse = player.town.townHall.upgradeBuilding(player);
        if (upgradeResponse>=0){
            return upgradeResponse.toString();
        } else {
            return "Not enough resources!";
        }
    });
});



// This function should return an object with visible values for start
function getStartValues(req,res){
    //Values: townhall level, resources per sec, resources, gold per sec, gold,
    // troops in town, troop training cost, town hall upgrade cost,
    let player = players.get(req.session.name);
    let valuePack = getUpdateValues(req,res);
    valuePack.playerName = req.session.name;
    valuePack.troopTrainingCost = player.town.barracks.trainingCost;

    return valuePack;
}

// This function should return an object with visible values for update
function getUpdateValues(req,res){
    //Values: townhall level, resources per sec, resources, gold per sec, gold,
    // troops in town
    let player = players.get(req.session.name);
    let valuePack = {
        townHallLVL: player.town.townHall.lvl,
        commonResourcesPerSec: player.town.baseField.resourcesPerSec, //Needs to also
        // handle income from conquered fields
        commonResources: player.resources,
        goldResourcesPerSec: 0,
        goldResources: player.gold,
        troopsInside: player.town.troopsInside,
        upgradeCostTownHall: player.town.townHall.upgradeCost,
    }
    return valuePack;
}

module.exports = router;