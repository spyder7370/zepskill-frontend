let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
	username: {
		type: String
	}
});
userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });
let User = mongoose.model('user', userSchema);
module.exports = User;
