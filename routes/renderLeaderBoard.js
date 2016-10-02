var express = require('express');
var router = express.Router();


router.get('/Leader', function(req, res) { 
	console.log('req recieved with req.session.email value' + req.session.email);
	if(req.session.email)
		return res.sendFile('/views/front/leaderboard.html',{root : '.'});
	else
		return res.redirect('/login');

});
module.exports = router;