var express = require('express');
var router = express.Router();


router.get('/removeQuestion', function(req, res) { 
	console.log('req recieved with req.session.admin value' + req.session.admin);
	if(req.session.admin && req.session.admin == 'admin')
		return res.sendFile('/views/backoffice/pages/manageQuestion.html',{root : '.'});
	else
		return res.redirect('/adminLogin');

});

module.exports = router;