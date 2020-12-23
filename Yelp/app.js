const express = require('express');
const port = 3000;
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const Joi = require('joi');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');


const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected")
});

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
	secret: 'thisshouldbeabettersecret!',
	resave: false,
	saveUninitialized: true,
	//TODO: make a mongo (store: xxx) before deployment.  but leave it blank only for dev purposes.
	cookie: {
		httpOnly: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7
	}
}
app.use(session(sessionConfig))

app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews); // by default, we wont have access to that 'id' in reviews route

app.get('/', (req, res) => {
	res.render('home');
});



// IF nothing matched, going to 404 route
app.all('*', (req, res, next) => {
	next(new ExpressError('Not Found', 404))
})
// err handler
app.use((err, req, res, next) => {
	const {statusCode = 500} = err;
	if (!err.message) err.message = 'something went wrong!'
	res.status(statusCode).render('error', {err});
})

app.listen(port, () => {
	console.log('Server listening on port 3000')
})