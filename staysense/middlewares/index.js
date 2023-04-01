exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		req.flash('error', 'please sign in');
		res.redirect('/login');
	}
};
