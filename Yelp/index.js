const express = require('express');
const app = express();
const morgan = require('morgan');

// on every request, use morgan middleware
app.use(morgan('tiny'));

app.get('/', (req, res) => {
	res.send('HOME PAGE')
})

app.get('/dogs', (req, res) => {
	res.send('DOGS PAGE')
})


app.listen(3000, (() => {console.log('listening on port 3000')}))