var express = require ('express');
var router = express.Router();
var Question = require('../Models/question.js');
var crypto = require('crypto');

router.post('/addQuestion', function(req, res) {
	// Check Session.
	// parsing value from req.body object
	console.log("Received Request post:/addQuestion");
	var question = req.body.question;
	var level =  req.body.level;
	var techAnswer = crypto
					.createHash('md5')
					.update(req.body.techAnswer)
					.digest('hex');
	var nonTechAnswer = crypto
					.createHash('md5')
					.update(req.body.nonTechAnswer)
					.digest('hex');
	var hint = req.body.hint;
	//validate data here

	// Creating model named Question.
	var newQuestion = new Question({
		'question' : question,
		'level' : level,
		'technicalAnswer' : techAnswer,
		'nonTechnicalAnswer' : nonTechAnswer,
		'hint' : hint
	});

	newQuestion.save(function(err){
		if(err){
			res.send("Question Not saved");
			return console.log(err);
		}
		return res.send('data saved');
	});
});

module.exports = router;
