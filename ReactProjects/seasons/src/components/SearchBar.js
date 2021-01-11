import React from 'react';

class SearchBar extends React.Component {
	// onInputChange(event) {
	// 	console.log(event.target.value);
	// }
	state = {term: ''};
	
	render() {
		return (
			<div className="ui segment">
				<form className="ui form">
					<div className="field">
						<label htmlFor="search">Image Search</label>
						<input id="search" type="text" value={this.state.term}
						       onChange={(e) => this.setState({term: e.target.value})}/>
						{/*<input id="search" type="text" onChange={this.onInputChange}/>*/}
						{/*// onInputChange() here means this function will be called whenever component is rendered.*/}
						{/*// by leaving off the (), we are passing the reference to this function to the input element*/}
					</div>
				</form>
			</div>
		)
	}
}

export default SearchBar;