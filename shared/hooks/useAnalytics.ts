import { useEffect, useState } from "react";
import ReactGA from "react-ga";

const useAnalytics = () => {
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		if (window.location.href.includes("localhost")) {
			ReactGA.initialize("UA-240835393-1");
		}

		setInitialized(true);
	}, []);

	return initialized;
};

export default useAnalytics;
