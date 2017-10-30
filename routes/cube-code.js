var express = require('express');
var router = express.Router();

/* GET cube-code listing. */
router.get('/', function(req, res, next) {
  res.send('this is cube code API');
});

module.exports = router;
