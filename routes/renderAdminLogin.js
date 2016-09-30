var express = require('express');
var router = express.Router();


router.get('/adminLogin', function(req, res) { 

	if(req.session.admin && req.session.admin != '')
		return res.redirect('/admin');
	res.sendFile('/views/backoffice/pages/login.html', {root : '.'});

});
module.exports = router;