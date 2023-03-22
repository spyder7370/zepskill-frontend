let express = require('express');
let router = express.Router();
// model
let Job = require('../models/job-DB.js');

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
router.get('/jobs/new', function(req, res) {
	res.render('new');
});

// create
router.post('/jobs', async function(req, res) {
	try {
		// make a database object
		let newJob = new Job({
			name: req.body.name,
			address: req.body.address,
			image: req.body.image
		});
		await newJob.save();
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
		let updatedJob = {
			name: req.body.name,
			address: req.body.address,
			image: req.body.image
		};
		await Job.findByIdAndUpdate(id, updatedJob);
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
		res.redirect('/jobs');
	} catch (error) {
		console.log('error while deleting the job', error);
	}
});

module.exports = router;
