const mongoose = require('mongoose'),
	passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [ true, 'you need to pass a username' ],
		unique: true,
		trim: true
	},
	image: {
		type: String
	},
	name: {
		type: String,
		default: 'not given',
		trim: true
	}
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('user', userSchema);
module.exports = User;
