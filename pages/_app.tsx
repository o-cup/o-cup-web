import router from "next/router";
import Script from "next/script";
import React, { useState, useEffect } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../shared/styles/gloabalStyle";
import theme from "../shared/styles/theme";
import "react-date-range-ts/dist/styles.css";
import "../shared/styles/react-spring-bottom-sheet.css";
import type { AppProps } from "next/app";

declare global {
	interface Window {
		gtag: any;
	}
}

const pageView = (url: string) => {
	if (typeof window !== "undefined") {
		window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
			page_path: url,
		});
	}
};

const MyApp = ({
	Component,
	pageProps,
}: AppProps<{ dehydratedState: unknown }>) => {
	const [queryClient] = useState(() => new QueryClient());

	/** 100vh 맞춤 */
	function setScreenSize() {
		const vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	}

	useEffect(() => {
		setScreenSize();
		window.addEventListener("resize", () => setScreenSize());
	}, []);

	/** Google Analytics */
	useEffect(() => {
		const handleRouteChange = (url: string) => {
			pageView(url);
		};
		router.events.on("routeChangeComplete", handleRouteChange);
		router.events.on("hashChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
			router.events.off("hashChangeComplete", handleRouteChange);
		};
	}, [router.events]);

	return (
		<>
			<Script
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
			/>
			<Script
				id="gtag-init"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
				}}
			/>
			<Script
				id="kakaoMap"
				strategy="beforeInteractive"
				src="//dapi.kakao.com/v2/maps/sdk.js?appkey=aa90b5cd8734fb0ed66e4f3aab95a147&autoload=false&libraries=services"
			/>
			<Script
				id="kakaoJS"
				strategy="beforeInteractive"
				type="text/javascript"
				src="https://developers.kakao.com/sdk/js/kakao.js"
			/>

			<QueryClientProvider client={queryClient}>
				<RecoilRoot>
					<ThemeProvider theme={theme}>
						<GlobalStyle />
						<Hydrate state={pageProps.dehydratedState}>
							<Component {...pageProps} />
						</Hydrate>
						<ReactQueryDevtools initialIsOpen />
					</ThemeProvider>
				</RecoilRoot>
			</QueryClientProvider>
		</>
	);
};

export default MyApp;
