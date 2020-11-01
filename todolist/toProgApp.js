const todoList = [];

// let input = prompt( 'What would you like to do?');       use let because reassign input afterwards
// while(input !== 'quit' && input !== 'q')   not or

while (true) {
	let input = prompt( 'What would you like to do?');
	if (input === null || input.toLowerCase() === 'quit') {
		console.log('OK, YOU QUIT THE APP')
		break;
	}
	else if (input.toLowerCase() === 'new') {
		let item = prompt('Enter new todo');  // should use const to assign 'cause only need once here
			todoList.splice(0, 0, item);  // push should be easier / or unshift
			console.log(`${item} added to the list`);

	} else if (input.toLowerCase() === 'list') {
		console.log('*********');
		for (let i = 0; i < todoList.length; i++) {
			console.log(`${i}: ${todoList[i]}`)
		}
		console.log('*********')
	} else if (input.toLowerCase() === 'delete') {
		const index = parseInt(prompt('Enter index of todo to delete'));
		if (!Number.isNaN(index) && index <= todoList.length) {
			todoList.splice(index, 1);
			console.log('Todo Removed')
		} else {console.log('wrong index')}
	} else {console.log('Read The Instruction!')}

	111
}