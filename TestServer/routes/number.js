var express = require('express');
var router = express.Router();
var CountNumber = require('./../model/counterModel.js');
var Player = require('./../model/playerClass.js');

let numberObject = new CountNumber.CountNumber();

let player1 = new Player.Player(1, "Beian", "Brian's Town", 1, 1);
let players = new Map();
players
    .set("user1", user1 = new Player.Player(1, "Beian", "Brian's Town", 1, 1))
    .set("user2", "user2")
    .set("user3", "user3")
    .set("user4", "user4")
    .set("user5", "user5")
    .set("user6", "user6");


router.get('/get', function(req, res) {
    console.log(req.session);

    res.send(player1.town.troopsInside + " troops in town");


    //old code
    //res.send(numberObject.getCount().toString());
});

router.get('/set', function(req, res) {
    let action = player1.town.barracks.trainTroops(player1.resources, player1.town.troopsInside);

    player1.resources = action.resources;
    player1.town.troopsInside = action.troops;
    res.send(action.message);

    //old code
    //res.send("Set number successfully!");
    //numberObject.incrementCount();
});


module.exports = router;
