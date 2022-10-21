import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import React from "react";
import { ServerStyleSheet } from "styled-components";
import type { DocumentContext } from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;
		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<Html lang="ko">
				<Head>
					<meta charSet="utf-8" />
					<meta name="keywords" content="" />
					<meta name="theme-color" content="#ffffff" />

					<link rel="icon" href="/images/logo/favicon.ico" />
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/images/logo/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/images/logo/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/images/logo/favicon-16x16.png"
					/>
					<link rel="manifest" href="/images/logo/site.webmanifest" />

					<meta
						name="naver-site-verification"
						content="10acbc20bd9fc3f9871a0ff13ed7dbd6dbe90876"
					/>

					{/* <!-- google fonts --> */}
					<link
						href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Noto+Sans:wght@300;400;500;600;700;800&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
					<Script
						id="Adsense-id"
						data-ad-client="ca-pub-2524496852271657"
						async
						// strategy="afterInteractive"
						onError={(e) => {
							console.error("Script failed to load", e);
						}}
						src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
					/>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
