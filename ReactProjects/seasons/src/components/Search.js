import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Search = () => {
	const [term, setTerm] = useState('program');   // set a default search term
	const [debouncedTerm, setDebouncedTerm] = useState(term);
	const [results, setResults] = useState([]);
	
	useEffect(() => {  // redo useEffect(), 1st.
		const timerId = setTimeout(() => {
			setDebouncedTerm(term);
		}, 1000);
		return () => {
			clearTimeout(timerId);
		}
	}, [term])
	
	useEffect(() => {  // redo useEffect(), 2nd, and remove the below one 👇
		const search = async () => {
			const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
				params: {
					action: 'query',
					list: 'search',
					origin: '*',
					format: 'json',
					srsearch: debouncedTerm,
				}
			});
			setResults(data.query.search);
		}
		search();
	},[debouncedTerm])
	
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