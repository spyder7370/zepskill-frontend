let express = require('express');
let router = express.Router();
// model
let Job = require('../models/job-DB.js');
let Notification = require('../models/notif-DB');

router.get('/', function(req, res) {
	res.render('landing');
});

// index
router.get('/jobs', async function(req, res) {
	try {
		// extract all the jobs from db
		let foundJobs = await Job.find({});
		res.render('index', { foundJobs });
	} catch (error) {
		console.log('error while extracting all jobs', error);
	}
});

// new
router.get('/jobs/new', async function(req, res) {
	res.render('new');
});

// create
router.post('/jobs', async function(req, res) {
	try {
		// make a database object / model instance
		let newJob = new Job({
			name: req.body.name,
			address: req.body.address,
			image: req.body.image,
			package: req.body.package,
			cgpa: req.body.cgpa,
			deadline: req.body.deadline,
			type: req.body.type
		});
		await newJob.save();
		//! push a new notificatoin
		let newNotif = new Notification({
			body: 'A new job has been posted',
			author: newJob.name
		});
		await newNotif.save();
		res.redirect('/jobs');
	} catch (error) {
		console.log('error while adding a new job', error);
	}
});

// show
router.get('/jobs/:id', async function(req, res) {
	try {
		// fetch the required job by using id
		let id = req.params.id;
		let job = await Job.findById(id);
		// eval(require('locus'));
		// findOne
		// res.send('test');
		res.render('show', { job });
	} catch (error) {
		console.log('error while fetching a job', error);
	}
});

// edit
router.get('/jobs/:id/edit', async function(req, res) {
	try {
		// fetch the required job by using id
		let id = req.params.id;
		let job = await Job.findById(id);
		res.render('edit', { job });
	} catch (error) {
		console.log('error while fetching a job for edit form', error);
	}
});

// update
router.patch('/jobs/:id', async function(req, res) {
	try {
		let id = req.params.id;
		// simple js object
		let updatedJob = {
			name: req.body.name,
			address: req.body.address,
			image: req.body.image,
			package: req.body.package,
			cgpa: req.body.cgpa,
			deadline: req.body.deadline,
			type: req.body.type
		};
		await Job.findByIdAndUpdate(id, updatedJob);
		//! push a new notificatoin
		let newNotif = new Notification({
			body: 'A job has been updated',
			author: updatedJob.name
		});
		await newNotif.save();
		// findOneAndUpdate
		res.redirect(`/jobs/${id}`);
	} catch (error) {
		console.log('error while updating the job', error);
	}
});

// delete
router.delete('/jobs/:id', async function(req, res) {
	try {
		let id = req.params.id;
		await Job.findByIdAndDelete(id);
		// findOneAndDestroy
		res.redirect('/jobs');
	} catch (error) {
		console.log('error while deleting the job', error);
	}
});

module.exports = router;
