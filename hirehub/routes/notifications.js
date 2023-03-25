let express = require('express');
let router = express.Router();
let Notification = require('../models/notif-DB');

// index
router.get('/notifications', async function(req, res) {
	try {
		let allNotifs = await Notification.find({});
		res.render('index-notif.ejs', { allNotifs });
	} catch (error) {
		console.log('error while fetching notifs', error);
	}
});
// new
router.get('/notifications/new', function(req, res) {
	res.render('new-notif');
});
// create
router.post('/notifications', async function(req, res) {
	try {
		let notif = new Notification({
			body: req.body.body,
			author: req.body.author
		});
		await notif.save();
		res.redirect('/notifications');
	} catch (error) {
		console.log('error while creating notif', error);
	}
});
// delete
router.delete('/notifications/:id', async function(req, res) {
	try {
		Notification.findByIdAndDelete(req.params.id);
		res.redirect('/notifications');
	} catch (error) {
		console.log('error while deleting notif', error);
	}
});
module.exports = router;
