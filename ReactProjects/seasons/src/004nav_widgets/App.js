// App.js from Widget App
import React, {useState} from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from "./components/Dropdown";
import Translate from "./components/Translate";
import Route from "./components/Route";
import Header from "./components/Header";

const items = [
	{
		title: 'what is react?',
		content: 'react is a front end js framework'
	},
	{
		title: 'why use react?',
		content: 'react is a favorite JS library among engineers'
	},
	{
		title: 'how do you use react?',
		content: 'we use react by creating components'
	}
]

const options = [
	{
		label: 'The Color Red',
		value: 'red'
	},
	{
		label: 'The Color Green',
		value: 'green'
	},
	{
		label: 'The Color Blue',
		value: 'blue'
	}
];
// const showAccordion = () => {   // 5.1.2  make 3 more copy of other components
// 	if (window.location.pathname === '/' ) {
// 		return <Accordion items={items} />;
// 	}
// }

export default () => {
	const [selected, setSelected] = useState(options[0]); // 5.1.3
	// const [showDropdown, setShowDropdown] = useState(true);
	
	return (
		<div className="ui container">
			<Header />   {/*// 5.2*/}
			<Route path="/">      {/* 5.1.3 */}
				<Accordion items={items}/>  //when provide JSX inside another JSX, this inner element is a prop called children
			</Route>
			<Route path="/list">  {/* 5.1.3 */}
				<Search />
			</Route>
			<Route path="/dropdown">  {/* 5.1.3 */}
				<Dropdown
					label="Select a Color"
					options={options}
					selected={selected}
					onSelectedChange={setSelected}
				/>
			</Route>
			<Route path="/translate">  {/* 5.1.3 */}
				<Translate />
			</Route>
			{/*{showAccordion()}    /!*5.1.2*!/*/}
			{/*{showList()}    /!*5.1.2*!/*/}
			{/*<Translate />*/}   {/*5.1.1*/}
			{/*<Accordion items={items}/>*/}
			{/*<Search />*/}
			{/*<button onClick={() => setShowDropdown(!showDropdown)}>Toggle Dropdown</button>*/}
			{/*{showDropdown ?*/}
			{/*	<Dropdown*/}
			{/*	selected={selected}*/}
			{/*	onSelectedChange={setSelected}*/}
			{/*	options={options}*/}
			{/*/> : null}*/}
		</div>
	)
}
