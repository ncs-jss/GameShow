var express = require('express');
var router = express.Router();


router.get('/adminLeaderBoard', function(req, res) { 
	console.log('req recieved with req.session.email value' + req.session.email);
	if(req.session.id && req.session.id == 'admin')
		return res.sendFile('/views/backoffice/pages/leaderboard.html',{root : '.'});
	else
		return res.redirect('/adminLogin');

});
module.exports = router;