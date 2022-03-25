var express = require('express');
var router = express.Router();
var CountNumber = require('./../model/counterModel.js');
var Player = require('./../model/playerClass.js');

let numberObject = new CountNumber.CountNumber();

let player1 = new Player.Player(1, "Beian", "Brian's Town", 1, 1);
let players = new Map();
players
    .set("user1", user1 = new Player.Player(1, "A", "Player 1's Town", 1, 1))
    .set("user2", user2 = new Player.Player(2, "B", "Player 2's Town", 2, 2))
    .set("user3", user3 = new Player.Player(3, "C", "Player 3's Town", 3, 3))
    .set("user4", user4 = new Player.Player(4, "D", "Player 4's Town", 4, 4))
    .set("user5", user5 = new Player.Player(5, "E", "Player 5's Town", 5, 5))
    .set("user6", user6 = new Player.Player(6, "F", "Player 6's Town", 6, 6));


router.get('/get', function(req, res) {
    console.log(req.session.name);

    res.send(players.get(req.session.name).town.troopsInside + " troops in town");


    //old code
    //res.send(numberObject.getCount().toString());
});

router.get('/set', function(req, res) {
    let action = players.get(req.session.name).town.barracks.trainTroops(players.get(req.session.name).resources, players.get(req.session.name).town.troopsInside);

    players.get(req.session.name).resources = action.resources;
    players.get(req.session.name).town.troopsInside = action.troops;
    res.send(action.message);

    //old code
    //res.send("Set number successfully!");
    //numberObject.incrementCount();
});


module.exports = router;
