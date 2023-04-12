const express = require('express'),
	passport = require('passport');
const router = express.Router();
const User = require('../models/user');

router.get('/register', (req, res) => {
	res.render('users/register');
});

router.post('/register', async (req, res) => {
	try {
		let user = new User({
			username: req.body.username
		});
		let registeredUser = await User.register(user, req.body.password);
		req.login(registeredUser, function(err) {
			if (err) {
				req.flash('error', 'registration failed, please try again');
				console.log(err);
				return res.redirect('/register');
			}
			req.flash('success', 'welcome user');
			res.redirect('/hotels');
		});
	} catch (error) {
		req.flash('error', 'registration failed, please try again');
		console.log(error);
		return res.redirect('/register');
	}
});

router.get('/login', (req, res) => {
	res.render('users/login');
});

router.post(
	'/login',
	passport.authenticate('local', {
		failureFlash: true,
		failureRedirect: '/login'
	}),
	(req, res) => {
		req.flash('success', 'welcome back user');
		let redirectUrl = req.session.returnTo || '/hotels';
		// delete req.session.returnTo;
		res.redirect(redirectUrl);
	}
);

router.get('/logout', (req, res) => {
	try {
		req.logout();
		req.flash('success', 'logout done');
		res.redirect('/hotels');
	} catch (error) {
		req.flash('error', 'logout failed, please try again');
		console.log(error);
		res.redirect('back');
	}
});

module.exports = router;
