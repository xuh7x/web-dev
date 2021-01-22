import React from "react";

const Accordion = ({items}) => {  // receive a list of items
	const renderedItems = items.map(item => {
		return (
			<React.Fragment key="item.title"> {/*use React.Fragment instead of div to remove extra boarder on the top*/}
				<div className="title active">
					<i className="dropdown icon"> </i>
					{item.title}
				</div>
				<div className="content active">
					<p>{item.content}</p>
				</div>
			</React.Fragment>
		)
	});
	return (
		<div className="ui styled accordion">
			<h1> {items.length} items:</h1>
			<div>{renderedItems}</div>
		</div>
	)
}

export default Accordion;