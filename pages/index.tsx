import Head from "next/head";
import React from "react";
import Main from "../components/main";
import { DEFAULT_TITLE, DEFAULT_URL } from "../shared/constants";

const Index = () => {
	const description =
		"응원하는 아티스트의 생일 이벤트를 오늘의 컵홀더에서 확인해보세요!";
	const logo = "https://www.o-cup.kr/images/ocup_profile.jpg";

	return (
		<>
			<Head>
				<title>{DEFAULT_TITLE}</title>
				<meta
					name="viewport"
					content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
				/>
				<meta name="description" content={description} />

				<meta property="og:type" content="website" />
				<meta property="og:title" content={DEFAULT_TITLE} />
				<meta property="og:description" content={description} />
				<meta property="og:image" content={logo} />
				<meta property="og:url" content={DEFAULT_URL} />

				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={DEFAULT_TITLE} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={logo} />
				<meta name="twitter:site" content={DEFAULT_URL} />
			</Head>

			<Main />
		</>
	);
};

export default Index;
