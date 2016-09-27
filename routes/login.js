var express = require('express');
var router = express.Router();
var User = require('../Models/userInfo.js');


/* GET users listing. */
router.post('/login', function(req, res, next) {
  var emailOrNumber =  req.body.emailOrNumber;
  var password = req.body.password;
  User.findOne({$or : [{ 'email_ID' : emailOrNumber },
  					   { 'mobileNumber' : emailOrNumber }]}, function(err, result) {
  					   		if (err)
  					   			return console.log(err);
  					   		if (!err)
  					   			if ( result && (result.password == password) ) {
  					   				return res.send("login Successfull Mr " + result.name);
  					   			}
  					   			res.send("kuch to gadbad hai!!");	
  					   });

});

module.exports = router;
