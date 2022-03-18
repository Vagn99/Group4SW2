var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  const { name, password } = req.body;
  req.session = req.body;
  console.log(req.session);

  if (name === "admin" && password === "admin") {
    res.render("success", {
      username: name,
    });
  }
  else{
    res.send('Login failed');
  }
});

module.exports = router;
