// App.js from Widget App
import React from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';

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

export default () => {
	return (
		<div className="ui container">
			{/*<Accordion items={items}/>*/}
			<Search />
		</div>
	)
}
