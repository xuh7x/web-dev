const express = require('express');   //1 express
const app = express();//1 express app
const path = require('path');//1 path of ejs
const port = 3000; //2 port for the app
const mongoose = require('mongoose');     //3
const methodOverride = require('method-override') // 10

// 4 require the Product model
const Product = require('./models/product');
const Farm = require('./models/farm');
// 5 to begin use product in DB, first, create a seeds file, to give some initial data since it's annoying to build app without any data in the DB

//3 connect DB
mongoose.connect(
	// 'mongodb://localhost:27017/farmStand',
	'mongodb://localhost:27017/farmRelationship',
	{useNewUrlParser: true, useUnifiedTopology: true}
)
	.then(() => {
		console.log('Mongo connection open~~')
	})
	.catch(err => {
		console.log("Mongo connection error!", err);
	})
// 2.by default, when created a new express app, & using a view engine, express is gonna assume the view the template
// exists in dir-'views' based on the current dir (default)   => make the 'views' dir  'mkdir views'
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')   // express helped to require ejs package
app.use(express.urlencoded({extended: true}))  // parsing application
app.use(methodOverride('_method')) // 10

const categories = ['fruit', 'vegetable', 'dairy', 'fungi']

//3 router
app.get('/products', async (req, res) => {
	const {category} = req.query;   // add {} to destructure
	if (category) {
		const products = await Product.find({category})
		res.render('products/index', {products, category})
	} else {
		const products = await Product.find({})
		res.render('products/index', {products, category: 'All'})
	}
	// const products = await Product.find({})
	// // console.log(products)
	// // res.send('ALL PRODUCTS WILL BE HERE!')
	// res.render('products/index', { products })
})
// 8 router 'new' has to be before the :id router
app.get('/products/new', (req, res) => {
	res.render('products/new', {categories});
})
app.post('/products', async (req, res) => {
	// to get info from post request body, without parsing, it's undefined
	// so, tell express to use the middleWare first - app.use(express.urlencoded({extended: true}))
	const newProduct = new Product(req.body);
	await newProduct.save();  // it takes time, so make it async and wait
	// res.send(newProduct)
	// if refresh the page, will send the post over again, need redirect
	res.redirect(`/products/${newProduct._id}`)
})
//  FARM ROUTES ...
app.get('/farms', async (req, res) => {
	const farms = await Farm.find({})
	res.render('farms/index', {farms})
})
app.get('/farms/new', (req, res) => {
	res.render('farms/new');
})
app.get('/farms/:id', async (req, res) => {
	// const farm = await Farm.findById(req.params.id);
	// populate products under farm
	const farm = await Farm.findById(req.params.id).populate('products');
	res.render('farms/show', {farm})
})

app.post('/farms', async (req, res) => {
	const newFarm = new Farm(req.body);
	await newFarm.save();
	res.redirect(`/farms`)
})

app.get('/farms/:id/products/new', async (req, res) => {
	const {id} = req.params;
	const farm = await Farm.findById(id);
	res.render('products/new', {categories, farm})
})
app.post('/farms/:id/products', async (req, res) => {
	// single out the pieces: get these three only in  req.body
	const {name, price, category} = req.body;
	// and pass in these three directly into new product:
	const product = new Product({name, price, category})  // which no farm associated with
	// if no need to single out, go with new Product(req.body)
	const {id} = req.params;
	const farm = await Farm.findById(id);
	farm.products.push(product);      // add  product in farm
	product.farm = farm;             // add  farm info in product
	await farm.save();
	await product.save();
	//db.farms.find() => { "_id" : ObjectId("5fd230---d004f2b2c"), "products" : [ ObjectId("5fd36972b---4cc3c3a") ], "name" : "Cxx", ... }
	//db.products.find() => "farms" : [ ObjectId("5fd36972------------") ]  farms inside product will only show id
	res.redirect(`/farms/${id}`)
})

app.get('/products/:id', async (req, res) => {
	const {id} = req.params;
	const product = await Product.findById(id).populate('farm', 'name');
	console.log(product);
	res.render('products/show', {product})
})
app.get('/products/:id/edit', async (req, res) => {
	//before render edit form, we look up for product details - async
	const {id} = req.params;
	const product = await Product.findById(id);
	res.render('products/edit', {product, categories});
})
// put request will overwrite the object
app.put('/products/:id', async (req, res) => {
	// a form cannot make a put request => use method-override package
	const {id} = req.params;
	const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
	res.redirect(`/products/${product._id}`)
})
// router for delete request
app.delete('/products/:id', async (req, res) => {
	const {id} = req.params;
	const deletedProduct = await Product.findByIdAndDelete(id);
	res.redirect('/products');
})
//2 use express app to listen on the port
app.listen(port, () => {
	console.log('Listening on port 3000');
})

