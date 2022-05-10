var express = require('express');
var router = express.Router();

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

let winner = "";
router.get('/victory', function(req, res) {
  if (winner==""){
    winner = req.session.name;
  }
  console.log(winner+" won");
  res.render("success", {winner: winner});
});


module.exports = router;
