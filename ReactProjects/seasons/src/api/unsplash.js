import axios from 'axios';

export default axios.create({
	baseURL: 'https://api.unsplash.com',
	headers: {
		Authorization: 'Client-ID tmrep2h_f-hzRMhAL4cnKiZqmUo9aPXrBxuXAXXW0W0'
	}
})