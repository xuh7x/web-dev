import React from 'react';
import SearchBar from "./SearchBar";
import youtube from "../apis/youtube";
import VideoList from "./VideoList";

class App extends React.Component {
	state = { videos: [] }
	onTermSubmit = async (term) => {
		// console.log(term) to test
		const response = await youtube.get('/search', {
			params: {
				q: term // adding a new param 'q'
			}
		});
		this.setState({videos: response.data.items});
	}
	
	render() {
		return (
			<div className="ui container">App
				<SearchBar onTermSubmit={this.onTermSubmit}/>
				<VideoList videos={this.state.videos}/>
			</div>
			
		)
	}
}

export default App;