import React from 'react';
import ReactDOM from 'react-dom';

// const App = () => {
// 	window.navigator.geolocation.getCurrentPosition(
// 		(position) => {
// 			console.log(position);
// 		},
// 		(err) => console.log(err)
// 	);
// 	return <div>latitude: </div>
// }

class App extends React.Component {
	// constructor func is the very first func that is gonna be called when this class is created
	constructor(porps) {
		// 1 way to initialize state
		super(porps);   // super - parent's constructor function
		
		// THIS IS THE ONLY TIME WE DO DIRECT ASSIGNMENT TO this.state
		this.state = { lat: null, errorMessage: '' }  // if the value is #, set the default to 'null'
		// updating 'state' on a component causes the component to (almost) instantly rerender
		
		// get user's location
		window.navigator.geolocation.getCurrentPosition(
			// this callback func is not gonna be invoked until we eventually return from the constructor.
			(position) => {
				// update state use only setState(), run below when we successfully fetch the position
				this.setState({lat: position.coords.latitude})
			},
			(err) => {
				this.setState({errorMessage: err.message})
			}
		);
	}
	
	// render method - is required for every react component we created - have to define render
	render() {
		if (this.state.errorMessage && !this.state.lat) {
			return <div>Error: {this.state.errorMessage}</div>
		}
		if (this.state.lat && !this.state.errorMessage) {
			return <div>Latitude: {this.state.lat}</div>
		}
		return <div>Loading...</div>
	}
}

ReactDOM.render(
	<App/>,
	document.querySelector('#root')
)