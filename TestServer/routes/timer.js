var express = require('express');
var router = express.Router();

//Starts timer on page load
let time = 0;
runTimer();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(time.toString())
});

function runTimer() {
  setInterval(() => {
    time++;
  }, 1000);
}

module.exports = router;
