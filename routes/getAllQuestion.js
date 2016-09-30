var express = require ('express');
var router = express.Router();
var Question = require('../Models/question.js');
var crypto = require('crypto');


router.get('/getAllQuestion', function(req, res) {
	// Check Session.
	if(req.session.admin && req.session.admin == 'admin')
	Question.find({}).exec(function(err,result) {
		if(err)
			return res.send(err);
		return res.send(result);
	});
	else
		res.redirect('/adminLogin');
});

module.exports = router;