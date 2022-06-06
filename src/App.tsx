import React from "react";
import { Helmet } from "react-helmet";
import GlobalStyle from "./styles/gloabalStyle";
import Main from "./pages/Main";

function App() {
	return (
		<>
			<GlobalStyle />
			<Helmet>
				<title>🥤오늘의 컵홀더 | Home</title>
			</Helmet>
			<Main />
		</>
	);
}

export default App;
