let mongoose = require('mongoose');

let jobSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	address: String,
	image: String,
	package: Number,
	cgpa: Number,
	deadline: {
		type: Date,
		default: Date.now
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	type: {
		type: String,
		default: 'fulltime'
	},
	appliedUsers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user'
		}
	],
	questions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'question'
		}
	]
});

let Job = mongoose.model('job', jobSchema);
module.exports = Job;
