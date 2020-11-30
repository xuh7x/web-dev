const express = require('express');   //1 express
const app = express();//1 express app
const path = require('path');//1 path of ejs
const port = 3000; //2 port for the app
const mongoose = require('mongoose');     //3

// 4 require the Product model
const Product = require('./models/product');
// 5 to begin use product in DB, first, create a seeds file, to give some initial data since it's annoying to build app without any data in the DB

//3 connect DB
mongoose.connect(
	'mongodb://localhost:27017/farmStand',
	{ useNewUrlParser: true, useUnifiedTopology: true}
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
//3 router
app.get('/products', async (req,res) => {
	const products = await Product.find({})
	// console.log(products)
	// res.send('ALL PRODUCTS WILL BE HERE!')
	res.render('products/index', { products })
})
// 8 router 'new' has to be before the :id router
app.get('/products/new', (req, res) => {
	res.render('products/new');
})
app.post('/products', async (req, res) => {
	// to get info from post request body, without parsing, it's undefined
	// so, tell express to use the middleWare first - app.use(express.urlencoded({extended: true}))
	const newProduct = Product(req.body);
	await newProduct.save();  // it takes time, so make it async and wait
	// res.send(newProduct)
	// if refresh the page, will send the post over again, need redirect
	res.redirect(`/products/${newProduct._id}`)
})
app.get('/products/:id', async (req,res) =>{
	const { id } = req.params;
	const product = await Product.findById(id);
	console.log(product);
	res.render('products/show', { product })
})


//2 use express app to listen on the port
app.listen(port, () => {
	console.log('Listening on port 3000');
})

