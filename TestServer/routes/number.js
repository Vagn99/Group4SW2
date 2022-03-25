var express = require('express');
var router = express.Router();
var CountNumber = require('./../model/counterModel.js');
var Player = require('./../model/playerClass.js');

let numberObject = new CountNumber.CountNumber();

let player1 = new Player.Player(1, "Beian", "Brian's Town", 1, 1);



router.get('/get', function(req, res) {

    let action = player1.town.barracks.trainTroops(player1.resources, player1.town.troopsInside);

    player1.resources = action.resources;
    player1.town.troopsInside = action.troops;
    res.send(action.message);
    //res.send(numberObject.getCount().toString());
});

router.get('/set', function(req, res) {
    res.send("Set number successfully!");
    numberObject.incrementCount();
});


module.exports = router;
