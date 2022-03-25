var express = require('express');
var router = express.Router();
var Players = require('./../model/userDB.js');

let players = Players.players;

let working = false;
let queue = 0;

router.get('/get', function(req, res) {
    console.log(req.session.name);
    //console.log(players.get(req.session.name));

    res.send(players.get(req.session.name).town.troopsInside + " troops in town");

});

router.get('/set', function(req, res) {
    console.log("I start");
    trainTrooper(req, res);
    console.log("I send");
    res.send(queue.toString());

});

function trainTrooper(req, res) {
    console.log("1 In function");
    let action = players.get(req.session.name).town.barracks.trainTroops(players.get(req.session.name).resources, players.get(req.session.name).town.troopsInside);
    console.log(action);
    if (!working) {
        working = true;
        console.log("start timer");
        setTimeout(() => {
            players.get(req.session.name).resources = action.resources;
            players.get(req.session.name).town.troopsInside = action.troops;
            console.log("Troop is done")
            working = false;
            console.log("end task");
            if (queue > 0) {
                queue--;
                trainTrooper(req, res);
            } else {
                console.log("Queue empty ");
            }
        }, 5000);
    } else {
        queue++;
    }
}




module.exports = router;
