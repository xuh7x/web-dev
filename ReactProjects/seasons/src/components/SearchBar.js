import React from 'react';

class SearchBar extends React.Component {
	// onInputChange(event) {
	// 	console.log(event.target.value);
	// }
	state = {term: ''};
	onFormSubmit = (event) => {        // is a shorthand for onFormSubmit: function(event){}
		event.preventDefault();
		// console.log(this.state.term);  // 'this' undefined : turn the func into arrow func: onFormSubmit = (event) => { }
		this.props.onSubmit(this.state.term);   // when in a class based component, we refer 'props' object with 'this.props'
	}
	
	render() {
		return (
			<div className="ui segment">
				{/*// when submit the form, run onFormSubmit*/}
				<form onSubmit={this.onFormSubmit} className="ui form">
					{/*// pass in a reference of the function 'this.onFormSubmit' without ()*/}
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