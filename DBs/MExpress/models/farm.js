const mongoose = require('mongoose');
// gonna use Schema.Types.ObjectId... so destructure it first
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

const Farm = mongoose.model('Farm', farmSchema);

module.exports =  Farm;