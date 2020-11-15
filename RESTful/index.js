const express = require('express')
const app = express();

app.use(express.urlencoded({extended: true}));

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