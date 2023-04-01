let User = require('../models/user-DB');

exports.showRegisterForm = (req, res) => {
	// render register form
	res.render('register');
};

exports.registerUser = async (req, res) => {
	// making a model instance
	let user = new User({
		username: req.body.username
	});
	// hashing and salting and saving
	let registeredUser = await User.register(user, req.body.password);
	// saved user is not logged in
	// passport -> cookie will automatically generate
	req.login(registeredUser, function(err) {
		if (err) {
			console.log('error while registering user');
		}
		res.redirect('/jobs');
	});
};

exports.showLoginForm = (req, res) => {
	// render login form
	res.render('login');
};

exports.loginUser = (req, res) => {
	// login is done by passport middleware
	// this function only redirects to somewhere
	res.redirect('/jobs');
};

exports.logoutUser = (req, res) => {
	// use default passport logout function
	req.logOut(function(err) {
		if (err) {
			console.log('error while logout');
		}
		res.redirect('/jobs');
	});
};
