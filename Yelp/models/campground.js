const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
	title: String,
	image: String,
	price: Number,
	description: String,
	location: String,
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Review' // ref - objectId from 'Review' model
		}
	]
});

campgroundSchema.post('findOneAndDelete', async function (doc) { // findOneAndDelete = a query middleware triggered by findByIdAndDelete()
	// console.log(doc); // doc: is the deleted campground object
	if(doc) {
		await Review.remove({
			_id: {
				$in: doc.reviews // remove reviews that _id is in the deleted campground
			}
		})
	}
})

module.exports = mongoose.model('Campground',  campgroundSchema)