var express = require('express');
var router = express.Router();
var User = require('../Models/userInfo.js');
var questionAssigned = require('../Models/questionAssigned.js');
var question = require ('../Models/question.js');


router.get('/getQuestion', function(req,res){
	if(!res.session.email ||  req.session.email == '') 
		  res.redirect('/login');

		//all the code for gettimg question;
		questionAssigned.findOne({'user_ID' : req.session.email , 'level' : req.session.level }, 
			function(err,result) {
				console.log(result);
				if(result) {
					//populate question details then send
					res.send(result);
				}
				else
					assignQuestion(req, res);
			});
	




});



var assignQuestion = function(req, res ) { 

	question.find({'level' : req.session.level}).exec(function(err, result) {

		if(result.length == 0)
			return res.send({'status' : "No questions for this level"});

		if(result.length == 1) {
			req.session.choice = null;

			User.findOne({'email_ID' : req.session.email}, function(err, user){

				if(err)
					return console.log(err);
				if (user) {
					var newQuestionToBeAssigned = new questionAssigned({
						'user_ID' : user.email_ID,
						'question_ID'  : result[0]._id,
						//'timeOfAssignment' : { type : Date, default : Date.now },
						//'timeOfCompletion' : { type : Date },
						//'duration' : Number,
						'level' : req.session.level
					});
					newQuestionToBeAssigned.save(function(Err) {
						if(err)
							console.log(err)
						else 
							res.redirect('/');

					});

				}
				else 
					res.send("Invalid session");
			})
		}
		if (result.length>1) {
			if(!req.session.choice || req.session.choice == null) {
				console.log('sending 3 doors page');
				//res.sendFile('')
				res.send('3 doors page will popup here');

			}
			else if (req.session.choice) {

				var temp = result[(Math.floor((Math.random() * 1000) + 1))%result.length];

				User.findOne({'email_ID' : req.session.email}, function(err, user){
				if(err)
					return console.log(err);
				if (user) {
					var newQuestionToBeAssigned = new questionAssigned({
						'user_ID' : user.email_ID,
						'question_ID'  : temp._id,
						//'timeOfAssignment' : { type : Date, default : Date.now },
						//'timeOfCompletion' : { type : Date },
						//'duration' : Number,
						'level' : req.session.level
					});
					newQuestionToBeAssigned.save(function(Err) {
						if(Err)
							console.log(Err)
						else 
							res.redirect('/');

					});

				}
				else 
					res.send("Invalid session");
			})
			}

		}
	}); 
}


module.exports = router;

