var express = require('express');
var router = express.Router();
var CountNumber = require('./../model/counterModel.js');
//var Player = require('./../model/playerClass.js');
var Players = require('./../model/userDB.js');

let players = Players.players;

router.get('/get', function(req, res) {
    console.log(req.session.name);
    console.log(players.get(req.session.name));

    res.send(players.get(req.session.name).town.troopsInside + " troops in town");

});

router.get('/set', function(req, res) {
    let action = players.get(req.session.name).town.barracks.trainTroops(players.get(req.session.name).resources, players.get(req.session.name).town.troopsInside);

    players.get(req.session.name).resources = action.resources;
    players.get(req.session.name).town.troopsInside = action.troops;
    res.send(action.message);

});


module.exports = router;
