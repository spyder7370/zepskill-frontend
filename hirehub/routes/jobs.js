let express = require('express'),
	jobController = require('../controllers/jobs');
let router = express.Router();
// model
let Job = require('../models/job-DB.js'),
	Notification = require('../models/notif-DB');
// middlewares, destructuring
let { isLoggedIn, isAdmin } = require('../middlewares/index');

router.get('/', jobController.showLandingPage);
// index
router.get('/jobs', jobController.jobIndex);
// new
router.get('/jobs/new', isLoggedIn, isAdmin, jobController.newJobForm);
// create
router.post('/jobs', isLoggedIn, isAdmin, jobController.createJob);
// show
router.get('/jobs/:id', jobController.showJob);
// edit
router.get('/jobs/:id/edit', isLoggedIn, isAdmin, jobController.editJobForm);
// update
router.patch('/jobs/:id', isLoggedIn, isAdmin, jobController.updateJob);
// delete
router.delete('/jobs/:id', isLoggedIn, isAdmin, jobController.deleteJob);
// apply in jobs
router.get('/jobs/:jobId/apply', isLoggedIn, jobController.applyJob);

module.exports = router;
