const express = require('express')
const app = express();
const path = require("path");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

const comments = [
	{
		username: 'Todd',
		comment: 'lol that is so funny!'
	},
	{
		username: 'Skyler',
		comment: "cycyc that is so funny!"
	},
	{
		username: 'Boil',
		comment: 'pleassszzz delete your account, Todd'
	}
]
app.get('/comments', (req, res) => {
	res.render('comments/index', { comments })
})

app.get('/comments/new', (req, res) => {
	res.render('comments/new')
})

app.post('/comments',(req, res) => {
	// console.log(req.body)
	const { username, comment } = req.body;
	comments.push({ username, comment})
	res.send("it worked!")
})

app.get('/tacos', (req, res) => {
	res.send('get /tacos response')
	console.log(req.query)
})

app.post('/tacos', (req, res) => {
	// res.send('post /tacos response')
	const { meat, qty} = req.body;
	res.send(`here are ${qty} ${meat} tacos`)
})

app.listen(3000, () => {
	console.log('on port 3000 listening')
})