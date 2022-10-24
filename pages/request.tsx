import Head from "next/head";
import React from "react";
import Request from "../components/request";
import { DEFAULT_TITLE, DEFAULT_URL, LOGO_URL } from "../shared/constants";

const RequestPage = () => {
	const title = `${DEFAULT_TITLE} | 등록하기`;
	const description = "응원하는 아티스트의 생일 이벤트를 신청해보세요!";

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
				/>
				<meta name="description" content={description} />

				<meta property="og:type" content="website" />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:image" content={LOGO_URL} />
				<meta property="og:url" content={DEFAULT_URL} />

				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={LOGO_URL} />
				<meta name="twitter:site" content={DEFAULT_URL} />
			</Head>
			<Request />
		</>
	);
};

export default RequestPage;
