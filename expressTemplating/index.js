const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');

app.use(express.static('public'));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
	res.render('home')
})

app.get('/cats', (req, res) => {
	const cats = ['Blue', 'Grey', 'Rock', 'Winston', 'lolet']
	res.render('cats', {cats: cats})
})

app.get('/r/:subreddit', (req, res) => {
	const { subreddit } = req.params;  // req.params -> {subreddit: 'subredditName'}
	const data = redditData[subreddit];
	if (data){
		res.render('subreddit', { ...data })
	} else {
		res.render('notFound', { subreddit})
	}
})

app.get('/rand',  (req, res) => {
	const num = Math.floor(Math.random()*10) + 1;
	res.render('random', {rand: num});  // or just num in{}
} )

app.listen(3000, () => {
	console.log('listening on port 3000')
})