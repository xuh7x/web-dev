import React, {useState} from 'react';

const Search = () => {
	const [term, setTerm] = useState('');
	return (
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
	)
}

export default Search;