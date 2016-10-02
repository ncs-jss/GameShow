var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectID =  Schema.Types.ObjectId;

var userInfoSchema = new Schema({
	'referenceNumber' : { type : String, unique : true, required : true },
	'email_ID' : { type : String, unique : true,  required : true },
	'password' : { type : String,  required : true },
	'name' : String,
	'year' : Number,
	'mobileNumber' : { type : String, unique : true,  required : true },
	'avatar' : { type : Number, default : 1 }, //out of 1 to 5.
	'score' : {type : Number, default : 0 },
	'level' : { type : Number, default : 1 },	//level of question he is going to attempt ; min = 1;
	//'questionAssigned' : [{ type : ObjectID , ref: questionAssigned }],
	'date' :  { type : Date, default : Date.now },
	'lastAttemptTime' : { type :Date },
	'badges' : []

});

var userInfo = mongoose.model('User', userInfoSchema);
module.exports = userInfo;
