import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Search = () => {
	const [term, setTerm] = useState('program');   // set a default search term
	const [results, setResults] = useState([]);
	useEffect(() => {
		// - console.log('initial render or term was changed')
		// the only thing allowed return is another function :  return () => { }
		// the first render will return the below, then, anytime run the effect function again, react will first call the
		// cleanup func that got from last time use effect ran, then it's gonna call the effect() again.
		// - return () => { console.log('cleanup')};
		// make request anytime term changes
		// we cannot make effect func as async func. instead, write the async func inside of effect and call it immediately
		const search = async () => {   // method 1
			const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
				params: {  // axios will code params as query string, and append on to the end of the url above
					action: 'query',
					list: 'search',
					origin: '*',
					format: 'json',
					srsearch: term,
				}
			});
			setResults(data.query.search);
		}
		if (term && !results.length) {
			search();
		} else {
			const timeoutId = setTimeout(() => {
				if (term) search();
			}, 600);
			return () => {
				clearTimeout(timeoutId);
			}
		}
		// if (term) search();  // or make a default search term
		// method 2            same as #1  no performance benefit at all, use either readable
		// (async () => {
		// 	await axios.get('222')
		// })();
		// method 3
		// axios.get('111')
		// 	.then((response) => {
		// 		console.log(response.data)
		// 	});
		
	}, [term]);
	
	const renderedResults = results.map((res) => {
		return (
			<div className="item" key={res.pageid}>
				<div className="right floated content">
					<a
						className="ui button"
						href={`https://en.wikipedia.org?curid=${res.pageid}`}
					>Go
					</a>
				</div>
				<div className="content">
					<div className="header">{res.title}</div>
					{/*anytime u take a string from 3rd part like this, u could be introducing a security hole into ur application
					 - XSS attack - kind = cross site scripting attack - that is where we accidentally pickup and render some HTML
					  from an untrusted source that can allow hacker to execute some JS inside of our application.*/}
					<span dangerouslySetInnerHTML={{__html: res.snippet}}></span>
					{/*{res.snippet}*/}
				</div>
			</div>
		)
	})
	
	return (
		<div>
			<div className="ui form">
				<div className="field">
					<label htmlFor="input">Enter Search Term: </label>
					<input id="input"
					       className="input"
					       value={term}
					       onChange={e => setTerm(e.target.value)}
					/>
				</div>
			</div>
			<div className="ui celled list">{renderedResults}</div>
		</div>
	)
}

export default Search;