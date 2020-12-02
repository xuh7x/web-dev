const express = require('express');
const port = 3000;
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
	console.log("Database connected")
})
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
	res.render('home');
})

app.get('/makecampground', async (req, res) => {
	const camp = new Campground({ title: 'My Backyard', description:'cheap camp'})
	await camp.save();
	res.send(camp);
})
app.listen(port, () => {
	console.log('Server listening on port 3000')
})