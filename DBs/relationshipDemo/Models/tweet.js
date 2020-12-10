// ONE TO Bajillion:
const mongoose = require('mongoose');
// pull out mongoose.Schema
const {Schema} = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		console.log('Mongodb connection open!')
	})
	.catch(err => {
		console.log('Mongodb connection error!')
		console.log(err)
	})

const userSchema = new Schema({
	username: String,
	age: Number,
})
const tweetSchema = new Schema({
	text: String,
	likes: Number,
	user: { type: Schema.Types.ObjectID, ref: 'User'}
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema)

const makeTweets = async () => {
	// const user = new User({username: 'chickenfan99', age: 61})
	const user = await User.findOne({ username: 'chickenfan99'})
	// const tweet1 = new Tweet({ text: 'I love my chicken family!', likes: 0})
	const tweet2 = new Tweet({ text:'bock bock my chicken', likes: 92})
	// tweet1.user = user;
	tweet2.user = user;
	// user.save();
	// tweet1.save();
	tweet2.save();
}
makeTweets();

// populate the user field in a tweet   - the name of model
const findTweet = async () =>{
	const t = await Tweet.findOne({}).populate('user');
	// populate('user', 'username');  populate 'user' with only username showing
	console.log(t);
}
findTweet();
// create the parent model - farm
const farmSchema = new Schema({ // simplified because const {Schema} = mongoose;
	name: String,
	city: String,
	// mongoose guide - populate
	// products: [{type: mongoose.Schema.Types.ObjectId}]  // normally pull it out via destructure
	// ref: is what tells Mongoose which model to use during population
	products: [{ type: Schema.Types.ObjectId, ref:'Product'}]
})
