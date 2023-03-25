import Head from "next/head";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import Main from "../components/main";
import { fetchEvents, fetchPeople } from "../shared/apis/common";
import {
	DEFAULT_DESCRIPTION,
	DEFAULT_TITLE,
	DEFAULT_URL,
	LOGO_URL,
} from "../shared/constants";

const Index = () => (
	<>
		<Head>
			<title>{DEFAULT_TITLE}</title>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
			/>
			<meta name="description" content={DEFAULT_DESCRIPTION} />

			<meta property="og:type" content="website" />
			<meta property="og:title" content={DEFAULT_TITLE} />
			<meta property="og:description" content={DEFAULT_DESCRIPTION} />
			<meta property="og:image" content={LOGO_URL} />
			<meta property="og:url" content={DEFAULT_URL} />

			<meta name="twitter:card" content="summary" />
			<meta name="twitter:title" content={DEFAULT_TITLE} />
			<meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
			<meta name="twitter:image" content={LOGO_URL} />
			<meta name="twitter:site" content={DEFAULT_URL} />
		</Head>

		<Main />
	</>
);

export const getStaticProps = async () => {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery("people", () => fetchPeople());
	await queryClient.prefetchQuery("events", () => fetchEvents({}));

	const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

	return {
		props: {
			dehydratedState,
			revalidate: 1000 * 60 * 60, // 1 hour
		},
	};
};

export default Index;
