import './ImageList.css';
import React from 'react';
import ImageCard from "./ImageCard";

const ImageList = (props) => {
	const img = props.images.map(image => {
		return <ImageCard key={image.id} image={image}/>
	})
	return (
		<div className="image-list">{img}</div>
	);
}

export default ImageList;