import React from 'react';

class SearchBar extends React.Component {
	state = {term: ''};
	
	onInputChange = (event) =>{
		this.setState({term: event.target.value});
	}
	
	onFormSubmit = (event) => {
		event.preventDefault();  // to prevent browser automatically refresh the page when submitting the form.
		//TODO: make sure to call callback from parent component
		this.props.onTermSubmit(this.state.term)
	}
	
	render(){
		return (
			<div className="ui segment search-bar">
				<form className="ui form" onSubmit={this.onFormSubmit}>
					<div className="field">
						<label htmlFor="video-search">Video Search</label>
						<input
							type="text" id="video-search"
							value={this.state.term}
							onChange={this.onInputChange} // = {e => this.setState({term: e.target.value})}
						/>
					</div>
				</form>
			</div>
		)}
}
export default SearchBar;