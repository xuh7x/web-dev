import React from 'react';
import faker from "faker";

const CommentDetail = () => {
	return (
		<div className="comment">
				<a href="/" className="avatar">
					<img src={faker.image.image()} alt="avatar"/>
				</a>
				<div className="content">
					<a href="/" className="author">
						Sam
					</a>
					<div className="metadata">
						<span className="date">Today at 6:00PM</span>
					</div>
					<div className="text">Nice Blog Post</div>
				</div>
			</div>
	);
}