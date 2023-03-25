let express = require('express');
let mongoose = require('mongoose');
let methodOverride = require('method-override');
let app = express();
let path = require('path');
mongoose
	.connect('mongodb+srv://admin:admin@hirehubdb.qt5g4th.mongodb.net/?retryWrites=true&w=majority')
	.then(function() {
		console.log('db working');
	})
	.catch(function(err) {
		console.log(err);
	});

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// import router
let jobRoutes = require('./routes/jobs.js');
let notifRoutes = require('./routes/notifications');
app.use(jobRoutes);
app.use(notifRoutes);

app.listen(3000, function() {
	console.log('server started on port 3000');
});
