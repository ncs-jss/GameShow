var express = require('express');
var router = express.Router();


router.get('/admin', function(req, res) { 
	console.log('req recieved for admin');
	if(req.session.email && req.session.level)
		return res.redirect('/');
	res.sendFile('/views/front/login.html',{root : '.'});

});
module.exports = router;