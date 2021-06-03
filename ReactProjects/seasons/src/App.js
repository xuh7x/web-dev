// App.js from Widget App
import React, {useState} from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from "./components/Dropdown";
import Translate from "./components/Translate";

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

export default () => {
	// const [selected, setSelected] = useState(options[0]);
	// const [showDropdown, setShowDropdown] = useState(true);
	
	return (
		<div className="ui container">
			<Translate />
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
