var express = require('express');
var router = express.Router();
var Reference = require('../Models/reference.js')


router.post('/generateMultipleReference', function(req, res) {
    //if (req.session.admin && req.session.admin == "admin") {
		var i=0;
		var resArray = [];
		
		var users = req.body.users; //users in an array of mixed types  {email : string, trekreg_ID: number}
		for (i=0; i<users.length; i++) {

		
	        var newReference = new Reference({
	            state: true,
	            email_ID: user[0].email_ID,
	            trekreg_ID : user[0].email_ID

	        });

	        newReference.referenceNumber = newReference._id //crypto.createHash('md5').update(req.body.email_ID).digest('hex')
	        
	        resArray.push(newReference);

	        newReference.save(function(err) {
	            if (!err) {
	               // res.send({ id: newReference.referenceNumber });
	            } else {
	                console.log(err);
	                res.send("try new email_ID")
	            }

	        });
	    }
	    res.send({valid : 1, data : resArray});
    //} else
     //   res.send(valid:0, redirect:"/admin");
});


module.exports = router;