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

					<meta
						name="google-site-verification"
						content="r6smUnD9fNvIvYfYR9ENd_OHZgaMfNoLAckTSkNMR88"
					/>

					{/* <!-- google fonts --> */}
					<link
						href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Noto+Sans:wght@300;400;500;600;700;800&display=swap"
						rel="stylesheet"
					/>

					<script
						id="Adsense-id"
						data-ad-client="ca-pub-2524496852271657"
						async
						onError={(e) => {
							console.error("Script failed to load", e);
						}}
						src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
					/>

					<script
						async
						type="text/javascript"
						src="//t1.daumcdn.net/kas/static/ba.min.js"
					/>
				</Head>
				<body>
					<ins
						className="kakao_ad_area"
						style={{ display: "none" }}
						data-ad-unit="DAN-eloyaCOUNzkG0TLf" // AdFit에서 발급 받은 광고단위코드 값
						data-ad-width="320" // 광고단위 가로 사이즈
						data-ad-height="100" // 광고단위 세로 사이즈
					/>

					<script
						async
						type="text/javascript"
						src="//t1.daumcdn.net/kas/static/ba.min.js"
					/>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
