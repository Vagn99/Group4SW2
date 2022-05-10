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

router.get('/getValues', function (req, res){
    // Should send an object with visible values
    res.send(getStartValues(req,res));
});

router.get('/update', function (req, res){
    // Should send an object with visible values
    res.send(getUpdateValues(req,res));
});

router.get('/upgradeTownHall', function (req, res){
    res.send(upgradeTownHall(req,res));
});

function upgradeTownHall(req, res){
    let player = players.get(req.session.name);
    let upgradeResponse = player.town.townHall.upgradeBuilding(player);
    console.log("I did upgrade");
    return upgradeResponse;
}



// This function should return an object with visible values for start
function getStartValues(req,res){
    //Values: townhall level, resources per sec, resources, gold per sec, gold,
    // troops in town, troop training cost, town hall upgrade cost,
    let player = players.get(req.session.name);
    let valuePack = {
        color:                      player.color,
        townHallLVL:                player.town.townHall.lvl,
        upgradeCostTownHall:        player.town.townHall.upgradeCost,
        baseCommonResourcesPerSec:  player.town.baseField.resourcesPerSec,
        totalCommonIncome:          player.resourcesPerSec,
        commonResources:            player.resources,
        goldResourcesPerSec:        player.goldPerSec,
        goldResources:              player.gold,
        troopsInside:               player.town.troopsInside,
        playerName:                 req.session.name,
        troopTrainingCost:          player.town.barracks.trainingCost
    }
    return valuePack;
}



module.exports = router;