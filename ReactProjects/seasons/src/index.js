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
		
		this.state = { lat: null, }  // if the value is #, set the default to 'null'
	}
	
	// render method - is required for every react component we created - have to define render
	render() {
		window.navigator.geolocation.getCurrentPosition(
			(position) => {
				console.log(position);
			},
			(err) => console.log(err)
		);
		return <div>Latitude: </div>
	}
}

ReactDOM.render(
	<App/>,
	document.querySelector('#root')
)