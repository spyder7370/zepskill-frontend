let mongoose = require('mongoose');

let questionSchema = new mongoose.Schema({
	description: String,
	option1: String,
	option2: String,
	option3: String,
	option4: String,
	correctOption: String
});

let Question = mongoose.model('question', questionSchema);
module.exports = Question;
