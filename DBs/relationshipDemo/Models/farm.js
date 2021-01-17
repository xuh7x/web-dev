//ONE TO MANY:     (one of solutions)
const mongoose = require('mongoose');
// pull out mongoose.Schema
const {Schema} = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		console.log('Mongodb connection open!')
	})
	.catch(err => {
		console.log('Mongodb connection error!')
		console.log(err)
	})

// define the child model
// const productSchema = new mongoose.Schema({ // simplified
const productSchema = new Schema({ // simplified because const {Schema} = mongoose;
	name: String,
	price: Number,
	season: {
		type: String,
		enum: ['Spring', 'Summer', 'Fall', 'Winter']
	}
});



// Product.insertMany([
// 	{name: 'Goddess Melon', price: 4.99, 001Season: 'Summer'},
// 	{name: 'Sugar Baby Watermelon', price: 4.99, 001Season: 'Summer'},
// 	{name: 'Asparagus', price: 3.99, 001Season: 'Spring'}
// ])

// create the parent model - farm
const farmSchema = new Schema({ // simplified because const {Schema} = mongoose;
	name: String,
	city: String,
	// mongoose guide - populate
	// products: [{type: mongoose.Schema.Types.ObjectId}]  // normally pull it out via destructure
	// ref: is what tells Mongoose which model to use during population
	products: [{ type: Schema.Types.ObjectId, ref:'Product'}]
})

const Product =  mongoose.model('Product', productSchema);
const Farm =  mongoose.model('Farm', farmSchema);

// one time func
// const makeFarm = async () => {
// 	const farm = new Farm({ name: 'Ful Belly Farms', city: 'Guinda, CA'});
// 	const melon = await Product.findOne({ name: 'Goddess Melon'});
// 	farm.products.push(melon)
// 	await farm.save();
// 	console.log(farm);
// }
// makeFarm();

const addProduct = async () => {
	const farm = await Farm.findOne({ name: 'Ful Belly Farms'})
	const watermelon = await Product.findOne({name: 'Sugar Baby Watermelon'})
	farm.products.push(watermelon);
	await farm.save();
	console.log(farm);
}

// addProduct()
Farm.findOne({name: 'Ful Belly Farms'})
	.populate('products') // show not only id inside of the array - the specific info. The products in farm schema has to have a ref of Product - to tell mongoose that we are populating with the actual 'Products' model.
	.then(farm => console.log(farm))