var express = require('express');
var router = express.Router();
var question = require('../Models/question');

router.get('/end', function(req, res) {
    return res.sendFile('/views/front/finalWinners.html', { root: '.' });
});
module.exports = router;
