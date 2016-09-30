var express = require('express');
var router = express.Router();



router.get('/logout',  function (req, res) {
	req.session.destroy(function(err) {
		if(err)
			return console.log(err);
		res.redirect('/');
	});
})

module.exports = router;