const express = require('express')
const app = express();
const path = require("path");
const {v4: uuid} = require("uuid");
const methodOverride = require('method-override')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

let comments = [
	{
		id: uuid(),
		username: 'Todd',
		comment: 'lol that is so funny!'
	},
	{
		id: uuid(),
		username: 'Skyler',
		comment: "cycyc that is so funny!"
	},
	{
		id: uuid(),
		username: 'Boil',
		comment: 'pleassszzz delete your account, Todd'
	}
]
app.get('/comments', (req, res) => {
	res.render('comments/index', {comments})
})

app.get('/comments/new', (req, res) => {
	res.render('comments/new')
})

app.post('/comments', (req, res) => {
	// console.log(req.body)
	const {username, comment} = req.body;
	comments.push({username, comment, id: uuid()})
	res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => {
	const {id} = req.params;
	// console.log(comments[0].id);
	const comment = comments.find(c => c.id === id)
	res.render('comments/show', {comment})
})

app.get('/comments/:id/edit', (req, res) => {
	const {id} = req.params;
	const comment = comments.find(c => c.id === id);
	res.render('comments/edit', {comment})
})

app.patch('/comments/:id', (req, res) => {
	const {id} = req.params;
	const newCommentText = req.body.comment;
	const oldComment = comments.find(c => c.id === id);
	oldComment.comment = newCommentText;
	res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) => {
	const {id} = req.params;
	// remake a copy without removed comment which id from upside:
	comments = comments.filter(c => c.id !== id);
	res.redirect('/comments')
})

app.get('/tacos', (req, res) => {
	res.send('get /tacos response')
	console.log(req.query)
})

app.post('/tacos', (req, res) => {
	// res.send('post /tacos response')
	const {meat, qty} = req.body;
	res.send(`here are ${qty} ${meat} tacos`)
})

app.listen(3000, () => {
	console.log('on port 3000 listening')
})