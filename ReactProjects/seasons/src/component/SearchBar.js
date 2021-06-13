import React, { useState } from 'react';  // 1.1 import useState

const SearchBar = ({ onFormSubmit }) => {   // 1.2 SearchBar func   //1.2.3 name of prop is same as the event handler
	const [term,  setTerm] = useState('');  // 1.2.1 initial State
	
	const onInputChange = (event) =>{  // 1.2.2 move the event handlers and define it using const, and change setState
		setTerm(event.target.value);
	}
	
	const onSubmit = (event) => {   // 1.2.3 change the func name to avoid the same name with prop
		event.preventDefault();  // to prevent browser automatically refresh the page when submitting the form.
		//TODO: make sure to call callback from parent component
		onTermSubmit(term)   //1.2.3 need to receive the prop onTermSubmit of this component
	}
	
	return (  // 1.2.4 cut from render() of the old class function
		<div className="ui segment search-bar">
			<form className="ui form" onSubmit={onSubmit}>
				<div className="field">
					<label htmlFor="video-search">Video Search</label>
					<input
						type="text" id="video-search"
						value={this.state.term}
						onChange={onInputChange} // = {e => setTerm(event.target.value)
						// onChange={(event => setTerm(event.target.value))}  // to remove onInputChange func  1.2.5
					/>
				</div>
			</form>
		</div>
	)
}
export default SearchBar;