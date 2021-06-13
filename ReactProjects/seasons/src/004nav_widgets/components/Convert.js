import React, { useState, useEffect } from "react";
import axios from "axios";   //4.3.2
const Convert = ({language, text}) => {   //4.3.1
	const [translated, setTranslated] = useState('');  // 4.3.3 use for translated data.
	const [debouncedText, setDebouncedText] = useState(text);  // 4.4 for useEffect 1 + 2
	useEffect(() => {   // 4.5.1 set a timer to update debouncedText; return a cleanup to cancel timer
		const timerId = setTimeout(()=> {
			setDebouncedText(text);
		}, 500)
		return () => clearTimeout(timerId);
		
	},[text])
	useEffect(() => {    //4.5.2 make request when debounceText changed
		const doTranslation = async () => {           // 4.3.4  helper func
			const { data } = await axios.post(          // destructure out of data from response
			'http://translation.googleapis.com/language/translate/v2', {},
			{ //4.3.2 2nd param send info in body of the request
				parameters: {
				q: debouncedText,  // 4.5.2 update text to debouncedText
				target: language.value,
				key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
				}
			})
			setTranslated(data.data.translations[0].translatedText)  // 4.3.4   udemy 194
		}
		doTranslation();   //4.3.4  invoke when changes
	}, [language, debouncedText])
	return (
		<div>
			<h1 className="ui header">{translated}</h1>  {/* 4.3.4 print response result*/}
		</div>
	)
}
export default Convert;