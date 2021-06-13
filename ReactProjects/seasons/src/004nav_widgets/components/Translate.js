import React, {useState, useEffect} from "react";
import Dropdown from "./Dropdown";
import Convert from "./Convert";

const options = [    // 4.1.0
	{label: 'Afrikaans', value: 'af'}, {label: 'Arabic', value: 'ar'}, {label: 'Hindi', value: 'hi'}
];
const Translate = () => {    // 4.1.0
	const [language, setLanguage] = useState(options[0]);  //4.1.1  selected option
	const [text, setText] = useState('');  //4.2
	
	return (
		<div>
			<div className="ui form">
				<div className="ui field">
					<label>Enter Text: </label>
					<input type="text" value={text} onChange={(e => setText(e.target.value))}/>  {/*4.2*/}
				</div>
			</div>
			<Dropdown
				options={options}
				label="Select a Language" selected={language} onSelectedChange={setLanguage} //4.1.2
			/>
			<hr/>
			<h3 className="ui header">Output</h3> {/*4.3.1*/}
			<Convert text={text} language={language} />   {/*4.3.1*/}
		</div>
	)
}
export default Translate;