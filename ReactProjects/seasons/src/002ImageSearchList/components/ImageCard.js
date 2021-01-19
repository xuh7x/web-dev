// show one image
import React from 'react';

class ImageCard extends React.Component{
	constructor(props){
		super(props);
		this.state = {spans: 0}   // initialize spans
		this.imageRef = React.createRef();
	}
	
	componentDidMount() {    // this gets called after rendered, image might rerender after loaded.
		this.imageRef.current.addEventListener('load', this.setSpans)
	}
	setSpans = () => {
		const height = this.imageRef.current.clientHeight;
		const spans = Math.ceil(height / 5);
		this.setState({spans})  // => this.setState({ spans: spans}) || same spans - use ES2015 syntax
	}
	render(){
		const {description, urls} = this.props.image;
		
		return(
			<div style={{ gridRowEnd: `span ${this.state.spans}`}}>
				<img ref={this.imageRef} alt={description} src={urls.regular} />
				{/* this is JSX tag, not html */}
			</div>
		)}
}
export default ImageCard;