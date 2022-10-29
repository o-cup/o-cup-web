import Head from "next/head";
import React from "react";
import Request from "../components/request";
import { DEFAULT_URL, LOGO_URL } from "../shared/constants";
import {
	generateSSRMetaDescription,
	generateSSRMetaTitle,
} from "../shared/utils/metaTags";

const RequestPage = () => {
	const title = generateSSRMetaTitle({ page: "request" });
	const description = generateSSRMetaDescription({ page: "request" });
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
