// Accordion.js from Widget App /components
import React, {useState} from "react"; 

const Accordion = ({items}) => {  // receive a list of items
	// initialize state using array destructuring, the first element stands for state, the 2nd is the setter function
	const [activeIndex, setActiveIndex] = useState(null);
	
	const onTitleClick = (index) => {
		// console.log('title clicked', index);
		setActiveIndex(index);
		// ASA we call setter function coming from useState HOOK, component is gonna be re-rendered
	}
	//JS-MAP & parameters https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
	const renderedItems = items.map((item, index) => {
		const active = index === activeIndex 		? 'active' : '';
		return (
			<React.Fragment key={item.title}> {/*use React.Fragment instead of div to remove extra boarder on the top*/}
				<div
					className={"title " + active}
					onClick={() => {onTitleClick(index)}}
				>{/*if without arrow function, the function is gonna invoked with the index when the listed item is rendered*/}
					<i className="dropdown icon"> </i>
					{item.title}
				</div>
				<div className={`content ${active}`}>
					<p>{item.content}</p>
				</div>
			</React.Fragment>
		)
	});
	return (
		<div className="ui styled accordion">
			<h1> {items.length} items:</h1>
			<div>{renderedItems}</div>
			{/*<h2>{activeIndex}</h2>*/}
		</div>
	)
}

export default Accordion;