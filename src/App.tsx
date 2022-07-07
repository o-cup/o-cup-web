import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/gloabalStyle";
import Main from "./pages/Main";
import Detail from "./pages/Detail";

function App() {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<HelmetProvider>
				<Helmet>
					<title>🥤오늘의 컵홀더 | Home</title>
				</Helmet>
			</HelmetProvider>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/detail/*" element={<Detail />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
