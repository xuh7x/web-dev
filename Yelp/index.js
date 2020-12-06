const express = require('express');
const app = express();
const morgan = require('morgan');

// on every any request, use morgan middleware - print info, then move on.
app.use(morgan('tiny'));
app.use((req, res, next) => {
	req.requestTime = Date.now();
	console.log(req.method, req.path);
	next();
})
app.use('/dogs', (req, res, next) => {
	console.log('using dogs');
	next();         // this only runs before .get("/dogs') when sending any type of XXX/dogs request
})
const verifyPassword = (req, res, next) => {
	console.log(req.query);    // "/dogs?food=chicken => query = { food: 'chicken' }
	const { password } = req.query;        // for every single rout, have to have a query string of correct password
	if (password === 'chickennugget') {
		next();
	}
	res.send('sorry, wrong password!')
}
// app.use((req, res, next) => {
// 	console.log(req, res("this is the first middleware!"));
// 	next();    // if comment out this next(), the below functions never run.
// 	console.log("this is in the first middleware, and will print out after the second middleware")
// })
// app.use((req, res, next) => {
// 	console.log("this is the second middleware")
// 	next();
// })
app.get('/', (req, res) => {
	res.send('HOME PAGE')
})

app.get('/dogs',verifyPassword, (req, res) => {
	res.send('DOGS PAGE')
})

app.use((req, res) => {
	//change status code to be 404 for NOT FOUND, then send the text
	res.status(404).send('NOT FOUND!')   // only runs if the above res never send - end the cycle if dont match any one of them.
})

app.listen(3000, (() => {console.log('listening on port 3000')}))