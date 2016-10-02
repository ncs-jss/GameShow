var express = require('express');
var router = express.Router();

var question = require('../Models/question.js');
var questionAssigned = require('../Models/questionAssigned.js');
/* GET home page. */
router.get('/makeChoice', function (req,res) {
	console.log("req recieved with email "+ req.session.email);
	if(req.session.email && req.session.email != "") {
		console.log('reached request to makeChoice');

    questionAssigned.find({user_ID : req.session.email, level : req.session.level})
    .exec(function(err,result) {
      
      if(err)
        return console.log(err);

      if(result&&result[0])
      return res.redirect('/');

  		res.sendFile('/views/front/lucky.html',{root : '.'});
    })
	}
  	else 
  		req.session.destroy(function(err) {
  			if(err) 
  				return res.send(err);
  			res.redirect('/login');
  			
  		})
});

module.exports = router;