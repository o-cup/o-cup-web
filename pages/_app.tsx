import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../shared/styles/gloabalStyle";
import theme from "../shared/styles/theme";
import "react-date-range-ts/dist/styles.css";
import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
	const [queryClient] = useState(() => new QueryClient());

	/** 100vh 맞춤 */
	function setScreenSize() {
		const vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	}

	useEffect(() => {
		setScreenSize();
	}, []);

	window.addEventListener("resize", () => setScreenSize());

	return (
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
				<ThemeProvider theme={theme}>
					<GlobalStyle />
					<Component {...pageProps} />
					<ReactQueryDevtools initialIsOpen />
				</ThemeProvider>
			</RecoilRoot>
		</QueryClientProvider>
	);
};

export default MyApp;
