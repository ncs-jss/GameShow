var express = require('express');
var router = express.Router();
var question = require('../Models/question');

router.get('/finish', function(req, res) {
	if(req.session.email)
    	return res.sendFile('/views/front/finalWinners.html', { root: '.' });
    return res.send({valid : 0, redirect : "/"})
});


module.exports = router;
