
var mongoose = require('mongoose');
var Schema = mongoose.Schema



var referenceSchema = new Schema({
state : { type : Boolean, default : true },	// true --means it can be used || false --means it is already used
hash : {type :String},
email_ID : {type : String}
});


var reference =  mongoose.model('Reference' , referenceSchema);
module.exports = reference;