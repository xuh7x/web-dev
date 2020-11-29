const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect(
	'mongodb://localhost:27017/farmStand',
	{useNewUrlParser: true, useUnifiedTopology: true}
)
	.then(() => {
		console.log("connect to farmStand DB in seeds.js")
	}).catch(err => {
		console.log("connect to DB failed in seeds.js", err)
	})
// no web app involved, no sever, no express
// this is the file that will run on it's own anytime I need to get some new data in DB
// it's common to do so for development purposes
// so that we put the connection part in this file as well to isolate this from the actual index of my APP
// const p = new Product({
// 	name: 'Ruby Grapefruit',
// 	price: 1.99,
// 	category: 'fruit'
// })
// p.save().then(p => {
// 	console.log(p)
// }).catch(e => {
// 	console.log(e)
// })
const seedProducts = [
	{
		name: 'Fairy Eggplan',
		price: 1.00,
		category: 'vegetable'
	},
	{
		name:  'Organic Goddess Melon',
		price: 4.99,
		category: 'fruit'
	},
	{
		name: 'Organic Mini Seedless Watermelon',
		price: 3.99,
		category: 'fruit'
	},
	{
		name: 'Organic Celery',
		price: 1.50,
		category: "vegetable"
	},
	{
		name: 'Chocolate Whole Milk',
		price: 2.69,
		category: "dairy"
	}
]
// if anything does not pass validation, then nothing will be inserted
Product.insertMany(seedProducts)
	.then(res => {
		console.log(res)
	})
	.catch(e => {
		console.log(e)
	})