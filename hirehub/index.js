// ! REQUIRING MODULES
let express = require('express'),
	mongoose = require('mongoose'),
	methodOverride = require('method-override'),
	path = require('path'),
	session = require('express-session'),
	passport = require('passport'),
	localStrategy = require('passport-local'),
	moment = require('moment'),
	flash = require('connect-flash');
let app = express();
require('dotenv').config();

// !DATABASE SETUP
let databaseUsername = process.env.DB_USERNAME;
let databasePassword = process.env.DB_PASS;
mongoose
	.connect(
		`mongodb+srv://${databaseUsername}:${databasePassword}@hirehubdb.qt5g4th.mongodb.net/?retryWrites=true&w=majority`
	)
	.then(function() {
		console.log('db working');
	})
	.catch(function(err) {
		console.log(err);
	});

// ! SESSION SETUP
let sessionPass = process.env.SESSION_PASS;
app.use(
	session({
		secret: sessionPass,
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			// secure: true,
			expires: Date.now() + 1000 * 60 * 60 * 24,
			maxAge: 1000 * 60 * 60 * 24
		}
	})
);

// ! DATABASE MODELS
let User = require('./models/user-DB');

// ! PASSPORT CONFIGURATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ! SERVER SETUP AND MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public'))); // static resources
app.set('view engine', 'ejs'); // ejs extension
app.use(express.urlencoded({ extended: true })); // body parsing
app.use(methodOverride('_method')); // patch/delete requests
app.use(flash()); // alerts
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.moment = moment;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

// ! ROUTING LOGIC
let jobRoutes = require('./routes/jobs.js');
let notifRoutes = require('./routes/notifications');
let authRoutes = require('./routes/auth');
let userRoutes = require('./routes/user');
let questionRoutes = require('./routes/questions');
app.use(jobRoutes);
app.use(notifRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(questionRoutes);

// ! PORT SETUP
let port = process.env.PORT;
app.listen(port, function() {
	console.log('server started on port 3000');
});
