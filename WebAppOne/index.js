const express = require('express');
const app = express();
const port = 3000;

// two important objects that express make for us:
// on any incoming request, we have access to 2 different parameters in this function that automatically passed in:
// req: incoming request
// res: outgoing response
app.use((req, res) => {
	console.log("anytime we have a incoming request(any kind of), this callback will run");
	// console.dir(req);
	// express created this req js object automatically for us, by parsing the incoming http request info.
	// then passed in as the first argument to this callback.
	res.send('got requests, this is the response info in callback')
		// anytime we call send, we are done with that request - we can't have a http request that gets more than on response
	// response string will give the content-type:text/html in the header;
	// response an object like{color: red} will give it application/json in the header
	// response a h1 element with tag, the browser will translate to heading1 style in the page.
})

//get: path and a callback func (same as use: req & res)
// req is an object by express based on incoming http request
app.get('/cats', (req, res) => {
	console.log("cat request")
	res.send("MEOW!")
})

app.get('/r/:subreddit', (req, res) => {
	console.log(req.params);   // return: {subreddit: 'subredditName'}
	const {subreddit} = req.params;
	res.send(`<h1> browsing the ${subreddit} subreddit; this is a subreddit request`)
})

app.get('/r/:subreddit/:postId', (req, res) => {
	const { subreddit, postId} = req.params;
})

app.listen(port, () =>{
	console.log('Server listening on port 3000');
})

