import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import GlobalStyle from "./styles/gloabalStyle";
import Main from "./pages/Main";

function App() {
	return (
		<>
			<GlobalStyle />
			<HelmetProvider>
				<Helmet>
					<title>🥤오늘의 컵홀더 | Home</title>
				</Helmet>
			</HelmetProvider>
			<Main />
		</>
	);
}

export default App;
