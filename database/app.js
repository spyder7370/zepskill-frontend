const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose
	.connect('mongodb+srv://admin:admin@testingdatabase.rgckh0k.mongodb.net/?retryWrites=true&w=majority')
	.then(function() {
		console.log('db connected');
	})
	.catch(function(error) {
		console.log(error);
	});
// model import
const Product = require('./models/product_db.js');

app.get('/', function(req, res) {
	res.send('landing page');
});

// * REST
// *index
app.get('/products', async function(req, res) {
	// *display all products
	try {
		const allProducts = await Product.find({});
		res.render('index', { allProducts });
	} catch (error) {
		console.log('problem while fetching');
	}
});
// new
app.get('/products/new', function(req, res) {
	//* send a form to add a new product
	res.render('new');
});
// create
app.post('/products', async function(req, res) {
	//* take data from form and make a new product
	try {
		// db object
		const newProduct = new Product({
			name: req.body.name,
			price: req.body.price,
			seller: req.body.seller,
			inStock: req.body.inStock
		});
		await newProduct.save();
		res.send('product successfully inserted');
	} catch (error) {
		console.log('error while inserting document');
	}
});
// show
app.get('/products/:id', async function(req, res) {
	// * take one product and display that product separately
	const id = req.params.id;
	const foundProduct = await Product.findById(id);
	res.render('show', { foundProduct });
});
// edit
app.get('/products/:id/edit', function(req, res) {
	// * renderes a form to edit a product
	const id = req.params.id;
	res.render('edit', { id });
});
// update
app.patch('/products/:id', async function(req, res) {
	const product = {
		name: req.body.name,
		price: req.body.price,
		seller: req.body.seller,
		inStock: req.body.inStock
	};
	await Product.findByIdAndUpdate(req.params.id, product);
	res.send('product successfully updated');
});
// delete
app.delete('/products/:id', async function(req, res) {
	// * delete product from db
	await Product.findByIdAndDelete(req.params.id);
	res.send('successfully deleted product');
});
app.listen(3000, function() {
	console.log('server running on port 3000');
});
