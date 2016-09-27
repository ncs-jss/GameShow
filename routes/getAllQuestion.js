var express = require ('express');
var router = express.Router();
var Question = require('../Models/question.js');


router.get('/getAllQuestion', function(req, res) {
	// Check Session.
	Question.find({}).exec(function(err,result){
		if(err)
			return res.send(err);
		return res.send(result);
	});
});

module.exports = router;