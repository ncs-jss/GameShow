var express = require('express');
var router = express.Router();
var Reference = require('../Models/reference.js')



/* GET users listing. */
router.get('/referenceAdmin', function(req, res, next) {


  if(req.session.admin && req.session.admin == 'admin'){
	  Reference.find({})
	  .exec(function(err, result) {
	    if(err)
	      return console.log(err);
	    res.send(result);

	  })
	}
	else
		res.redirect('/adminLogin');
});



module.exports = router;
