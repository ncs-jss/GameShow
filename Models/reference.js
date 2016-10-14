
var mongoose = require('mongoose');
var Schema = mongoose.Schema



var referenceSchema = new Schema({
state : { type : Boolean, default : true },	// true --means it can be used || false --means it is already used
trekreg_ID : {type :String, unique : true},
email_ID : {type : String , unique : true},
referenceNumber : {type : String, unique :true}
});


var reference =  mongoose.model('Reference' , referenceSchema);
module.exports = reference;