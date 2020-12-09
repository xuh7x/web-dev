//ONE TO FEW:

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Mongo connection open!")
	})
	.catch(err => {
		console.log("Connection Error!")
		console.log(err)
	})

const userSchema = new mongoose.Schema({
	first: String,
	last: String,
	addresses: [
		{
			_id: { id: false },   // by default mongoose will give a _id.
			street: String,
			city: String,
			state: String,
			country: String
		}
	]
})

const User =  mongoose.model('User', userSchema);

const makeUser = async () => {
	const u = new User({
		first: 'Harry',
		last: 'Potter'
	})
	u.addresses.push({
		street: '123 Sesame St.',
		city: 'New York',
		state: 'NY',
		country: 'USA'
	})
	const res = await u.save();
	console.log(res)
}
// makeUser();

// add one more address on specified id
const addAddress = async (id) => {
	const user = await User.findById(id);
	user.addresses.push(
		{
			street: '99 3rd St.',
			city: 'New York',
			state: 'NY',
			country: 'USA'
		}
	)
	const res = await user.save();
	console.log(res);
}

addAddress('5fd0cb0bfb8b334bb00874cd')