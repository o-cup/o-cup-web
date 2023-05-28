import { format } from "date-fns";
import Head from "next/head";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import Main from "../components/main";
import {
	fetchEventsByDate,
	getBiasListData,
} from "../components/main/fetchers";
import {
	DEFAULT_DESCRIPTION,
	DEFAULT_TITLE,
	DEFAULT_URL,
	LOGO_URL,
} from "../shared/constants";
import type { EventType } from "../shared/types";

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

export const getServerSideProps = async () => {
	const queryClient = new QueryClient();
	const today = format(new Date(), "yyyyMMdd");
	await queryClient.prefetchQuery(["eventListByDate"], () =>
		fetchEventsByDate(today)
	);
	await queryClient.prefetchQuery(["bidsByDate"], () => {
		const events = queryClient.getQueryData(["eventListByDate"]) as EventType[];
		const bids = Array.from(
			new Set(events?.map((event) => event.biasesId).flat())
		);
		return bids;
	});
	await queryClient.prefetchQuery(["biasListByDate"], () =>
		getBiasListData(today)
	);
	const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

	return {
		props: {
			dehydratedState,
		},
	};
};

export default Index;
