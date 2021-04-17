var mongoose = require('mongoose');
var Schema = mongoose.Schema;

suserSchema = new Schema( {
	
	unique_id: Number,
	email: String,
	firstname: String,
	lastname: String,
	gender: String,
	number: Number,
	password: String,
	passwordConf: String
}),
SUser = mongoose.model('SUser', suserSchema);

module.exports = SUser;