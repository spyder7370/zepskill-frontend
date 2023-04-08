const Review = require('../models/review'),
	Hotel = require('../models/hotel');

module.exports.isLoggedIn = async (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		console.log(req.originalUrl);
		req.session.returnTo = req.originalUrl;
		req.flash('error', 'please sign in');
		res.redirect('/login');
	}
};

module.exports.isReviewAuthor = async (req, res, next) => {
	let { reviewId } = req.params;
	let review = await Review.findById(reviewId).populate('author');
	if (review.author._id.equals(req.user._id)) {
		next();
	} else {
		req.flash('error', 'you are not permitted to do that');
		res.redirect('back');
	}
};

module.exports.isHotelAuthor = async (req, res, next) => {
	let { id } = req.params;
	let hotel = await Hotel.findById(id).populate('author');
	if (hotel.author._id.equals(req.user._id)) {
		next();
	} else {
		req.flash('error', 'you are not permitted to do that');
		res.redirect('back');
	}
};
