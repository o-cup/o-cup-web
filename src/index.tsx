import React from "react";
import ReactDOM from "react-dom/client";
import ReactGA from "react-ga";
import App from "./App";

const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;
ReactGA.initialize(TRACKING_ID!);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	// <React.StrictMode>
	<App />
	// </React.StrictMode>
);
