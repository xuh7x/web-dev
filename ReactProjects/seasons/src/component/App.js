import React from 'react';
import SearchBar from "./SearchBar";
import youtube from "../apis/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";

class App extends React.Component {
	state = {
		videos: [],
		selectedVideo: null,
	}
	
	// in order to have some default search on the page in stead of show a loading text on the top,
	// -> componentdidmount life cycle method, this method will make a default search when the app component first rendered
	componentDidMount() {
		this.onTermSubmit('');
	}
	
	onTermSubmit = async (term) => {
		// console.log(term) to test
		const response = await youtube.get('/search', {
			params: {
				q: term // adding a new param 'q'
			}
		});
		this.setState({
			videos: response.data.items,
			selectedVideo: response.data.items[0]  // set the default when submit the search term
		});
	}
	
	
	onVideoSelect = (video) => {
		// console.log('from the app. ', video)
		this.setState({selectedVideo: video});
	}
	
	render() {
		return (
			<div className="ui container">
				<div className="ui grid">
					<div className="ui row">  {/*if not having ui row, the ending item in a row might be rendered to the second row*/}
						<div className="sixteen wide column">
							<SearchBar onTermSubmit={this.onTermSubmit}/>
						</div>
						<div className="eleven wide column">
							<VideoDetail video={this.state.selectedVideo}/>
						</div>
						<div className="five wide column">
							<VideoList
								videos={this.state.videos}
								onVideoSelect={this.onVideoSelect}     // pass function into props of its child
							/>
						</div>
					</div>
				</div>
			</div>
		
		)
	}
}

export default App;