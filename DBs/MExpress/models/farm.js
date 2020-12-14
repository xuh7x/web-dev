const mongoose = require('mongoose');
// gonna use Schema.Types.ObjectId... so destructure it first
const Product = require('./product');
const {Schema} =  mongoose;

const farmSchema =  new Schema({
	name: {
		type: String,
		required: [true, 'Farm must have a name!']
	},
	city: {
		type: String
	},
	email: {
		type: String,
		required: [true, 'Email required!']
	},
	products: [   // two relationships, one from each direction
		{
			type: Schema.Types.ObjectId,
			ref: 'Product'
		}
	]
})
// showing how setup of a query middleware works
// farmSchema.pre('findOneAndDelete', async function (data) {
// 	// dont have access to the farm that is been deleted - it's running before the query
// 	console.log('pre middleware!');
// 	console.log(data);
// })
farmSchema.post('findOneAndDelete', async function (farm) {
	// in post middleware, we do have access to the deleted farm
	console.log('post middleware!');
	console.log(farm);
	if(farm.products.length) {
		// have to require product model first
		// delete all the products by all the id showing in 'products:[]'
		const result = await Product.deleteMany({ _id: { $in: farm.products }})
		// save it "- it wont include the deleted data, but it gives a summary of how many thing we removed.
		console.log(result)   // { n: 3, ok: 1, deletedCount: 3 }
	}
})

const Farm = mongoose.model('Farm', farmSchema);

module.exports =  Farm;