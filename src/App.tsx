import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./styles/gloabalStyle";
import Main from "./pages/Main";
import Detail from "./pages/Detail";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<GlobalStyle />
				<HelmetProvider>
					<Helmet>
						<title>🥤오늘의 컵홀더 | Home</title>
					</Helmet>
				</HelmetProvider>
				<RecoilRoot>
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/detail/:id" element={<Detail />} />
					</Routes>
				</RecoilRoot>
			</BrowserRouter>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
