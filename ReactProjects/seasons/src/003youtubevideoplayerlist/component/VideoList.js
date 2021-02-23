import React from 'react';
import VideoItem from "./VideoItem";

const VideoList = ({videos, onVideoSelect}) =>  {  // destructure
	console.log(videos)
	const renderedList = videos.map(video => {
		return <VideoItem
			key={video.id.videoId}
			video={video}
			onVideoSelect={onVideoSelect}
		/>
	})
		return (
			<div className="ui relaxed divided list">
				{renderedList}
			</div>
		)
}

export default VideoList;