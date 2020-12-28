import React from 'react';
import ReactDOM from 'react-dom';
import CommentDetail from './CommentDetail';
import faker from "faker";

const App = () => {
	return (
		<div className="ui container comments">
			<CommentDetail
				author="Sam"
				date="Today at 6:00PM"
				text="Nice Blog Post"
				img={faker.image.image()}
			/>
			<CommentDetail
				author="Jane"
				date="Today at 2:00AM"
				text="222"
				img={faker.image.image()}
			/>
			<CommentDetail
				author="Joy"
				date="Today at 1:00PM"
				text="233"
				img={faker.image.image()}
			/>
		</div>
	);
};

ReactDOM.render(<App/>, document.querySelector('#root'));