var mongoose = require('mongoose');
var Schema = mongoose.Schema;

tuserSchema = new Schema( {
	
	unique_id: Number,
	email: String,
	firstname: String,
	lastname: String,
	gender: String,
	number: Number,
	password: String,
	passwordConf: String
}),
TUser = mongoose.model('TUser', tuserSchema);

module.exports = TUser;