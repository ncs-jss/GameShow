var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	console.log(req.session.email);
	if(req.session.email && req.session.email != "") {
		console.log('reached request');
  		res.sendFile('/views/front/Tech-trek.html',{root : '.'});
	}
  	else 
  		req.session.destroy(function(err) {
  			if(err) 
  				return res.send(err);
  			res.redirect('/login');
  			
  		})
});

module.exports = router;
