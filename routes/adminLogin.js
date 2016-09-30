var express = require('express');
var router = express.Router();
//var User = require('../Models/userInfo.js');


/* GET users listing. */
router.post('/adminLogin', function(req, res, next) {

  if(req.session.email == "admin")
    return res.send({'valid' : 1, 'redirect' : '/admin'});
  var id =  req.body.id;
  var password = req.body.password;
  //console.log(password + emailOrNumber);
  if (id == 'ncsncs12' && password == 'GameShow');
   req.session.email = "admin"
	 return res.send({'valid' : 1, 'redirect' : '/admin'});
  }
	res.send("kuch to gadbad hai!!");	
});


module.exports = router;
