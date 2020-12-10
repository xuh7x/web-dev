const mongoose = require('mongoose');
const {Schema} = mongoose;
//no need to connect the DB here,
// since we are gonna require this model in index.js file where doing the connecting process

// make schema
const productSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true,
		min: 0
	},
	category: {
		type: String,
		lowercase: true,
		enum: ['fruit', 'vegetable', 'dairy']
	},
	// set farm id in each product -  if having a show page for products with relative farm showing
	farm: {  // not the only/best way for use
		type: Schema.Types.ObjectId,
		ref: 'Farm'
	}
})

//
const Product = mongoose.model('Product', productSchema);

// exports this model, so that it could be used somewhere else
module.exports = Product;
