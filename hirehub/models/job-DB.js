let mongoose = require('mongoose');

let jobSchema = new mongoose.Schema({
	name: String,
	address: String,
	image: String,
	package: Number,
	description: String
});

let Job = mongoose.model('job', jobSchema);
module.exports = Job;
