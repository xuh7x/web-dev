import React, { useState,useEffect, useRef } from "react";

const Dropdown = ({options, selected, onSelectedChange, label}) => {  // 2.1 destructure options out of props object
	const [open, setOpen] = useState(false);   // 2.3.1 state for active dropdown; false - close dropdown
	const ref = useRef();    //ref it to the most parent of Dropdown component's DOM element
	
	useEffect(() =>  {    // 3.1.  only run once when component first render, but when chose options, it stay open
		const onBodyClick = (event) => { // 3.1.3 listen to event //3.2.1 assign the 2nd parameter-listener to a new variable
			if (ref.current.contains(event.target)) {  //3.1.4if the clicked element is inside the ref.current div, do nothing.
				return;
			}
			setOpen(false);
		};
		document.body.addEventListener('click', onBodyClick, {capture: true}); //put the listener-onBodyClick back.
		return () => {    // 3.2.1  remove the added event listener on the browser
			document.body.removeEventListener('click', onBodyClick, {capture: true});
		};
	}, [])
	
	const renderedOptions = options.map((option) => {
		if (option.value === selected.value) {          // 2.2.3 filtering the option list, remove selected from dropdown
			return null;
		}
		return (
			<div key={option.value}
			     className='item'
			     onClick={() => onSelectedChange(option)}      // 2.2.2 when click on one of the divs, call onSelectedChange with the option
			>
				{option.label}
			</div>
		);
	});
	
	return (
		<div ref={ref} className='ui form'>                  {/*2.2 JSX... 👇*/} {/*3.1.3*/}
			<div className='field'>
				<label className='label'>{label}</label>
				<div
					onClick={() => setOpen(!open)}            // 2.3.2 click to turn off false or true
					className={`ui selection dropdown ${open ? 'visible active' : ''}`}    // 2.3.3
				>
					<i className='dropdown icon'></i>
					<div className='text'>{selected.label}</div>
					{/*2.2.1 show selected option  no set yet👆 */}
					<div className={`menu  ${open ? 'visible transition' : ''}`}> {/*2.3.3 click outside wont close dropdown */}
						{/* dropdown component can only set up event handlers easily (using JSX props) on elements it creates*/}
						{/* dropdown needs to somehow listen to events on the outside elements */}
						{renderedOptions}
					</div>
				</div>
			</div>
																																	{/*2.2 JSX... 👆 */}
			<p style={{color: selected.value}}>this text is {selected.value}</p>
		</div>
	);
}

export default Dropdown;