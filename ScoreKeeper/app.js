const board = document.querySelector('#scoreKeeper')
board.align = 'center'
const img = document.querySelector('#img');
img.style.width = '600px'

const imageDiv = document.querySelector('#image');

imageDiv.align = 'center'  // scoreKeeper.setAttribute("align", "center");
// imageDiv.style.flex = '1 600px auto'
const title = document.querySelector('#title')
title.style.display = 'block'
title.style.margin = '0 450px'
title.style.border = '1px solid grey'

// h1Elem.style.borderShadow = '10px 20px 20px 20px'
// document.querySelector('h1').align = 'left'
const container = document.querySelector('#counterContainer');
container.style.margin = '0 450px'
container.style.border = '1px solid grey'

const score = document.querySelector('#scores');
score.style.margin = '0 20px auto'
container.style.backGround = 'black'
console.dir(container)

document.querySelector('p').style.margin = '0 20px auto'
document.querySelector('b').style.margin = '0 20px auto'
const selector = document.querySelector('#select')
const buttonP1 = document.querySelector('#playerOne');
const buttonP2 = document.querySelector('#playerTwo');
const buttonRes = document.querySelector('#reset')
const scoreP1 = document.querySelector('#p1');
const scoreP2 = document.querySelector('#p2')
let valueP1 = 0;
let valueP2 = 0;

buttonP1.addEventListener('click', function(e) {
	if (valueP1 < selector.value) {
		valueP1 ++;
		scoreP1.innerText = valueP1;
		if(valueP1 == selector.value) {
			scoreP1.style.color = 'red';
			scoreP2.style.color = 'blue';
			buttonP1.disabled = true
			buttonP2.disabled = true
		}
	}
})
buttonP2.addEventListener('click', function(e) {
	if (valueP2 < selector.value) {
		valueP2 ++;
		scoreP2.innerText = valueP2;
		if(valueP2 == selector.value) {
			scoreP2.style.color = 'blue';
			scoreP1.style.color = 'red'
			buttonP1.disabled = true
			buttonP2.disabled = true
		}
	}
})
buttonRes.addEventListener('click', function(e) {
	buttonP1.disabled = false
	buttonP2.disabled = false
	valueP1 = 0;
	scoreP1.innerText = valueP1;
	scoreP1.style.color = 'black';
	valueP2 = 0;
	scoreP2.innerText = valueP2;
	scoreP2.style.color = 'black';


})