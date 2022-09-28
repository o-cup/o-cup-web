import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import ReactGA from "react-ga";
import GlobalStyle from "./styles/gloabalStyle";
import theme from "./styles/theme";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Request from "./pages/Request";
import Search from "./pages/Search";
import Wrapper from "./components/Wrapper";
import useAnalytics from "./hooks/useAnalytics";

const queryClient = new QueryClient();

function App() {
	const initialized = useAnalytics();

	const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;

	useEffect(() => {
		ReactGA.initialize(TRACKING_ID!);
	}, [TRACKING_ID]);

	useEffect(() => {
		const vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	});

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<BrowserRouter>
					<HelmetProvider>
						<Helmet>
							<title>오늘의 컵홀더</title>
						</Helmet>
					</HelmetProvider>
					<RecoilRoot>
						<Wrapper initialized={initialized}>
							<Routes>
								<Route path="/" element={<Main />} />
								<Route path="/detail/:id" element={<Detail />} />
								<Route path="/request" element={<Request />} />
								<Route path="/search" element={<Search />} />
							</Routes>
						</Wrapper>
					</RecoilRoot>
				</BrowserRouter>
				<ReactQueryDevtools initialIsOpen={false} />
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
