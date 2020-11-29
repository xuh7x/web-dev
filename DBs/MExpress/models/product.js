const mongoose = require('mongoose');

//no need to connect the DB here,
// since we are gonna require this model in index.js file where doing the connecting process

// make schema
const productSchema = new mongoose.Schema({
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
	}
})

//
const Product = mongoose.model('Product', productSchema);

// exports this model, so that it could be used somewhere else
module.exports = Product;
