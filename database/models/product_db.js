const mongoose = require('mongoose');
// schema
// !const schemaName = new mongoose.Schema({});
const productSchema = new mongoose.Schema({
	name: String,
	price: Number,
	seller: String,
	inStock: Boolean
});
// model
//! const modelName = mongoose.model('collection name', schema)
const Product = mongoose.model('product', productSchema);
// model export
module.exports = Product;
