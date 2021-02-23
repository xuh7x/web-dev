import './VideoItem.css';
import React from 'react';

const VideoItem = ({video, onVideoSelect}) => { // props ->  {video}  destructure
	return (
		<div onClick={() => onVideoSelect(video)} className="video-item item" >
			<img
				className="ui image"
				src={video.snippet.thumbnails.medium.url}
				alt={video.snippet.title}
			/>
			{/*<div>Video ID: {video.id.videoId}</div>*/}
			<div className="content">
				<div className="header">{video.snippet.title}</div>
			</div>
		</div>
	
	)
}
export default VideoItem;
