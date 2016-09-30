var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectID =  Schema.Types.ObjectId;

var questionAssignedSchema = new Schema({
	user_ID : { type : String },
	question_ID  : { type : ObjectID, ref : 'Question' },
	timeOfAssignment : { type : Date, default : Date.now },
	timeOfCompletion : { type : Date },
	duration : Number,
	level : Number
	});

var questionAnswered = mongoose.model('QuestionAssigned',  questionAssignedSchema);
module.exports = questionAnswered;
