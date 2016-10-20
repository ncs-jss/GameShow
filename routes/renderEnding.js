var express = require('express');
var router = express.Router();
var question = require('../Models/question');

router.get('/finish', function(req, res) {
	if(req.session.email)
    	return res.sendFile('/views/front/finalWinners.html', { root: '.' });
    return res.redirect ( "/");
});
module.exports = router;
