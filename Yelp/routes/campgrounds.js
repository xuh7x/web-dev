const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {campgroundSchema} = require('../schemas.js');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');


const validateCampground = (req, res, next) => {
	// this is not a mongo schema, this is gonna validate the data before tempting save it with mongoose
	const {error} = campgroundSchema.validate(req.body)    //  result.error = {error}
	if (error) {
		const msg = error.details.map(el => el.message).join(', ')  // details: [ [Object] ]
		throw new ExpressError(msg, 400)
	} else {
		next();
	}
}

router.get('/', catchAsync(async (req, res) => {
	const campgrounds = await Campground.find({});
	res.render('campgrounds/index', {campgrounds});
}));

router.get('/new', (req, res) => {
	res.render('campgrounds/new')
});

// validateCampground works as middleware
router.post('/', validateCampground, catchAsync(async (req, res, next) => {
	// try {
	// throw error here will be catch by catchAsync func, and handled by next()
	// if (!req.body.campground) throw new ExpressError('invalid campground data', 400);
	const campground = new Campground(req.body.campground); // res.body is empty by default, need to parse
	await campground.save();
	req.flash('success', 'Successfully made a new Campground!');
	res.redirect(`/campgrounds/${campground._id}`);
	// } catch (err) {next(err)}   // if there's a err go next err handler
}))

router.get('/:id', catchAsync(async (req, res) => {
	// console.log(req.params) => { id: '5fc7c975f88e392154295030' }
	const campground = await Campground.findById(req.params.id).populate('reviews');
	if (!campground) {
		req.flash('error', 'Cannot find that  campground');
		return res.redirect('/campgrounds'); //TODO really need this return?
	}
	res.render('campgrounds/show', {campground});
}));

router.get('/:id/edit', catchAsync(async (req, res) => {
	const campground = await Campground.findById(req.params.id);
	if (!campground) {
		req.flash('error', 'Cannot find that  campground');
		return res.redirect('/campgrounds'); //TODO really need this return?
	}
	res.render(`campgrounds/edit`, {campground});
}))

router.put('/:id', validateCampground, catchAsync(async (req, res) => {
	//TODO  ... spread out object !  NOTE! CHECK IT!
	const {id} = req.params;
	const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground}, {useFindAndModify: false});
	req.flash('success', 'Successfully updated compground!')
	res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:id', catchAsync(async (req, res) => {
	const {id} = req.params;
	await Campground.findByIdAndDelete(id);
	req.flash('success', 'Successfully Deleted a campground!')
	res.redirect('/campgrounds');
}))


module.exports = router;