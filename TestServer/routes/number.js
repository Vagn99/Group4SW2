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
    console.log("Req received working...");
    trainTrooper(req, res);
    console.log("Res send, callbac under way...");
    res.send("I did it!");

});

function trainTrooper(req, res) {
    console.log("trainTroops have been called by: " + req.session.name);
    let activePlayer = players.get(req.session.name);
    if (activePlayer.resources>0){
        activePlayer.resources = activePlayer.resources-1;
        console.log("Calling trainTroop function...");
        activePlayer.town.barracks.newTrainTroops(activePlayer.town);
    } else {
        console.log("Not enough resources!");
    }
    console.log(activePlayer);
    /*
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
    } */
}




module.exports = router;
