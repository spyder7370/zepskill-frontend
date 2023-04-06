const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUDNAME,
	api_key: process.env.CLOUDINARY_APIKEY,
	api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: 'StaySense',
		allowedFormats: [ 'png', 'jpg', 'jpeg' ] // supports promises as well
	}
});

module.exports = {
	cloudinary,
	storage
};
