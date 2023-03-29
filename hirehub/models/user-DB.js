let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	name: String,
	cgpa: Number,
	selected: {
		type: Boolean,
		default: false
	}
});
userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });
let User = mongoose.model('user', userSchema);
module.exports = User;
