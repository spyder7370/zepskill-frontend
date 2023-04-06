const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true,
		min: [ 100, 'hotel room needs to be atleast 100 rs' ],
		max: 10000
	},
	isRoomAvailable: {
		type: Boolean,
		default: true
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	images: [
		{
			url: String,
			filename: String
		}
	],
	overAllRating: {
		type: Number,
		default: 0
	},
	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'review'
		}
	]
});

const Hotel = mongoose.model('hotel', hotelSchema);
module.exports = Hotel;
