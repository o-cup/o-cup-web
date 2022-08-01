import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/gloabalStyle";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Admin from "./pages/Admin";
import theme from "./styles/theme";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<BrowserRouter>
					<HelmetProvider>
						<Helmet>
							<title>🥤오늘의 컵홀더 | Home</title>
						</Helmet>
					</HelmetProvider>
					<RecoilRoot>
						<Routes>
							<Route path="/" element={<Main />} />
							<Route path="/detail/:id" element={<Detail />} />
							<Route path="/admin" element={<Admin />} />
						</Routes>
					</RecoilRoot>
				</BrowserRouter>
				<ReactQueryDevtools initialIsOpen={false} />
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
