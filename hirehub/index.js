let express = require('express');
let mongoose = require('mongoose');
let methodOverride = require('method-override');
let app = express();
let path = require('path');
let session = require('express-session');
let passport = require('passport');
let localStrategy = require('passport-local');
let moment = require('moment');
mongoose
	.connect('mongodb+srv://admin:admin@hirehubdb.qt5g4th.mongodb.net/?retryWrites=true&w=majority')
	.then(function() {
		console.log('db working');
	})
	.catch(function(err) {
		console.log(err);
	});

app.use(
	session({
		secret: 'SuperSecretPasswordForHireHub',
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

let User = require('./models/user-DB');
// passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.moment = moment;
	next();
});
// import router
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

app.listen(3000, function() {
	console.log('server started on port 3000');
});
