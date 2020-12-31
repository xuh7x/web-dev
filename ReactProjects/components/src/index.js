import React from 'react';
import ReactDOM from 'react-dom';
import CommentDetail from './CommentDetail';
import faker from "faker";
import ApprovalCard from "./ApprovalCard";

const App = () => {
	return (
		<div className="ui container comments">
			<ApprovalCard>
				<CommentDetail
					author="Sam"
					date="Today at 6:00PM"
					text="Nice Blog Post"
					img={faker.image.image()}
				/>
			</ApprovalCard>
			
			<ApprovalCard>
				<CommentDetail
					author="Jane"
					date="Today at 2:00AM"
					text="222"
					img={faker.image.image()}
				/>
			</ApprovalCard>
			
			<ApprovalCard>
				<CommentDetail
					author="Joy"
					date="Today at 1:00PM"
					text="233"
					img={faker.image.image()}
				/>
			</ApprovalCard>
		</div>
	);
};

ReactDOM.render(<App/>, document.querySelector('#root'));