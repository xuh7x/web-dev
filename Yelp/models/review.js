const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
	body: String,
	rating: Number,
	// when having very high # of reviews, and a much larger application, for now, not be able to display many reviews at a time
	campground: {
		type: Schema.Types.ObjectId,
		ref: 'Campground'
	}
});

// need to connect multiple reviews with a campground - 1 to many relationship
module.exports = mongoose.model('Review', reviewSchema)