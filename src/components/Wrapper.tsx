import React, { useEffect } from "react";
import ReactGA from "react-ga";
import { useLocation } from "react-router-dom";

type WrapperProps = {
	initialized: boolean;
	children: React.PropsWithChildren<any>;
};

const Wrapper = (props: WrapperProps) => {
	const location = useLocation();

	useEffect(() => {
		if (props.initialized) {
			ReactGA.pageview(location.pathname + location.search);
		}
	}, [props.initialized, location]);

	return props.children;
};

export default Wrapper;
