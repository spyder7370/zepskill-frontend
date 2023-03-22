let express = require('express');
let mongoose = require('mongoose');
let methodOverride = require('method-override');
let app = express();

mongoose
	.connect('mongodb+srv://admin:admin@hirehubdb.qt5g4th.mongodb.net/?retryWrites=true&w=majority')
	.then(function() {
		console.log('db working');
	})
	.catch(function(err) {
		console.log(err);
	});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let jobRoutes = require('./routes/index.js');
app.use(jobRoutes);

app.listen(3000, function() {
	console.log('server started on port 3000');
});
