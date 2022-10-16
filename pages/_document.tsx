import Document, { Head, Html, Main, NextScript } from "next/document";
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
				</body>
			</Html>
		);
	}
}

export default MyDocument;
