import React from "react";

const Link = ({ className, href, children }) => {   // 5.3.2 pass these as props to Header.js
	const onClick = (event) => {   // 5.3.3  when click on the anchor element, prevent full page reload
		if (event.metaKey ||  event.ctrlKey) {   // 5.4  to restore Ctrl + Click open a new page
			return;
		}
		event.preventDefault();
		window.history.pushState({}, '', href);  //5.3.4 change URL without full page refresh
		
		const navEvent = new PopStateEvent('popstate');  //5.3.5 tell the Route Component that URL just changed.
		window.dispatchEvent(navEvent);
	}
	return <a className={className} href={href} onClick={onClick}>{children}</a>;  //5.3.2
}
export default Link;