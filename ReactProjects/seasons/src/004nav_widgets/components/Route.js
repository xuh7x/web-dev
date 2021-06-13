import { useEffect,useState } from "react";
//when provide JSX inside another JSX, this inner element is a prop called children
const Route =({ path, children }) => {
	const [currentPath, setCurrentPath] = useState(window.location.pathname);   //5.3.7
	useEffect(() => {
		const onLocationChange = () => {   //5.3.6 to clean up the event listener below, need to define this function.👇
			setCurrentPath(window.location.pathname);  // 5.3.7 whenever location changes, rerender Route
		}
		window.addEventListener('popstate', onLocationChange); // 5.3.6 listen to the event 'popstate', when it occurs, run the onLocationChange func
		return () => {
			window.removeEventListener('popstate', onLocationChange)   // 5.3.6 to clean up the above event listener 👆
		}
	}, [])  // []: run the effect function only it first render.
	return currentPath === path ? children : null;
}
export default Route;