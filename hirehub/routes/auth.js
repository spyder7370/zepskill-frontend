let express = require('express'),
	passport = require('passport'),
	authController = require('../controllers/auth');
let router = express.Router();
let User = require('../models/user-DB');

// ! API ENDPOINTS
router.get('/register', authController.showRegisterForm);
router.post('/register', authController.registerUser);
router.get('/login', authController.showLoginForm);
router.post(
	'/login',
	passport.authenticate('local', {
		failureRedirect: '/login'
	}),
	authController.loginUser
);
router.get('/logout', authController.logoutUser);

module.exports = router;
