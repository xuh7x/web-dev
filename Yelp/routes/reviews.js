const express = require('express');
const router = express.Router({mergeParams: true});// mergeParams - all the params in app.js will be merged here

const Campground = require('../models/campground');
const {reviewSchema} = require('../schemas.js');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
// routers get separate params when they are separate, unless set 'mergeParams' true in the express.Router({↑})
const Review = require('../models/review');


const validateReview = (req, res, next) =>{
	const{error} = reviewSchema.validate(req.body);
	if (error) {
		const msg = error.details.map(el => el.message).join(',')
		throw new ExpressError(msg, 400)
	} else {
		next();
	}
}

// create review route
router.post('/', validateReview, catchAsync(async (req, res) => {
	const campground = await Campground.findById(req.params.id);
	const review = new Review(req.body.review);
	// res.send(req.body)
	campground.reviews.push(review);
	await review.save();
	await campground.save();
	res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:reviewId', catchAsync(async (req, res)  =>{
	const { id, reviewId } = req.params;
	await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}) // take the reviewId, and pull anything with the id out of 'reviews'-array of ids
	await Review.findByIdAndDelete(req.params.reviewId)
	res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;