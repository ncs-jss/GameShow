mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectID =  Schema.Types.ObjectId;

var questionSchema = new Schema({ 
	question : { type : String, required : true },
	hint : String,
	technicalAnswer : { type : String, trim : true, lowercase: true },
	nonTechnicalAnswer : { type : String, trim : true, lowercase: true },
	level : { type : Number, required : true }
});

var  question = mongoose.model('Question', questionSchema );
module.exports = question;