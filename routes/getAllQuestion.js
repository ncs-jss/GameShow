var express = require ('express');
var router = express.Router();
var Question = require('../Models/question.js');



router.get('/getAllQuestion', function(req, res) {
	// Check Session.
	if(req.session.admin && req.session.admin == 'admin')
	Question.find({}).sort({level: 1}).exec(function(err,result) {
		if(err)
			return res.send(err);
		return res.send(result);
	});
	else
		res.redirect('/adminLogin');
});

module.exports = router;