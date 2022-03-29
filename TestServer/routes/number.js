var express = require('express');
var router = express.Router();
var Players = require('./../model/userDB.js');

let players = Players.players;

let working = false;
let queue = 0;

router.get('/start', function (req, res){
    console.log("Started view");
    let town = players.get(req.session.name).town;
    res.send({
        troopsInside: town.troopsInside,
        queue: town.barracks.queue,
        barrackInUse: town.barracks.barrackInUse,
        trainingTimeleft: town.barracks.trainingTimeleft
    });

})

router.get('/get', function(req, res) {
    console.log(req.session.name);

    res.send(players.get(req.session.name).town.troopsInside + " troops in town");

});

router.get('/set', function(req, res) {
    console.log("Req received working...");
    trainTrooper(req, res);
    console.log("Res send, callback under way...");
    res.send(players.get(req.session.name).town.barracks.queue.toString());

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

}

module.exports = router;
