var express = require('express');
var router = express.Router();
var Question = require('../Models/question.js');

router.post("/removeQuestion", function (req, res) {
	// Check session.

	var question_ID = req.body.question_ID;
	Question.remove({'_id' : question_ID}, function(err) {
		if(err)
			return res.send(err);
		res.send('removed Question with ID '+ question_ID);
	})
});

module.exports = router;