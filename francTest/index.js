/*the usage of the package in node.js*/

const franc = require('franc');
const lang = require('langs');

const wordsList = [];
for(let i = 2; i < process.argv.length; i++) {
	wordsList.push(process.argv[i]);
}
let langValue  = ''
for (let word of wordsList) {
	langValue = langValue.concat(`${word} `)
}

const langCode = franc(langValue);

const language = lang.where("3", langCode)

try {
	console.log(language.name)
} catch (e) {
	console.log('unknown language')
}





// console.log(langs.all()[0]['2'] === 'abk')

