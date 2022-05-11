var express = require('express');
var router = express.Router();
var Players = require('../model/playerDB.js');

//Starts timer on page load
let time = 0;
runTimer();

router.get('/', function(req, res, next) {
  res.send(time.toString())
});

function runTimer() {
  setInterval(() => {
    time++;
  }, 1000);
}


router.get('/victory', function(req, res) {
  console.log(Players.winner + " won");
  res.render("success", {
      winner: Players.winner
  })
});




module.exports = router;
