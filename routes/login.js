var express = require('express');
var router = express.Router();
var User = require('../Models/userInfo.js');


/* GET users listing. */
router.post('/login', function(req, res, next) {


  var emailOrNumber =  req.body.emailOrNumber;
  var password = req.body.password;
  //console.log(password + emailOrNumber);
  User.findOne({$or : [{ 'email_ID' : emailOrNumber },
  					   { 'mobileNumber' : emailOrNumber }]}, function(err, result) {
  					   		if (err)
  					   			return console.log(err);
  					   		if (!err)
  					   			if ( result && (result.password == password) ) {
                      req.session.email = result.email_ID;
                      console.log('reached here2');
                      return res.redirect('/');
  					   				//return res.send("login Successfull Mr " + result.name);
  					   			}
  					   			res.send("kuch to gadbad hai!!");	
  					   });

});

module.exports = router;
