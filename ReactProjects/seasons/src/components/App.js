import React from 'react';
import unsplash from "../api/unsplash";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";

class App extends React.Component {
	state = {images: []};
	
	onSearchSubmit = async (term) => {     // make it async func to redirect 'this' from props object to the App instance
		const response = await unsplash.get('/search/photos', {
			params: {query: term}
		});
		//.then(response => {console.log(response.data.results);})  //  way 1   / way 2: async+await
		this.setState({images: response.data.results}) // log: 'this' = { onSubmit: onSearchSubmit(), } the props object of SearchBar
	}
	
	render() {
		return (
			<div className="ui container" style={{marginTop: '10px'}}>
				<SearchBar onSubmit={this.onSearchSubmit}/>
				<ImageList images={this.state.images}/>
			</div>
		)
	}
}

export default App;