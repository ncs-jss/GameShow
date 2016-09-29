var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile( '/views/front/Tech-trek.html', {root : '.'});
});

module.exports = router;
