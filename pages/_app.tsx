import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../shared/styles/gloabalStyle";
import theme from "../shared/styles/theme";
import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<GlobalStyle />
					<Component {...pageProps} />;
					<ReactQueryDevtools initialIsOpen />
				</ThemeProvider>
			</QueryClientProvider>
		</RecoilRoot>
	);
};

export default MyApp;
