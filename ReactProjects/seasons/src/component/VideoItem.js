import React from 'react';

const VideoItem = (props) => {
	return (
		<div className="item">
			<img className="ui image" src={props.video.snippet.thumbnails.medium.url} />
			{/*<div>Video ID: {props.video.id.videoId}</div>*/}
			<div className="content">
				<div className="header">{props.video.snippet.title}</div>
			</div>
		</div>
	
	)
}
export default VideoItem;
