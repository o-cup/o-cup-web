import Head from "next/head";
import React from "react";
import Search from "../components/search";
import { fetchBiasNameById } from "../shared/apis/search";
import { DEFAULT_URL, LOGO_URL } from "../shared/constants";
import {
	generateSSRMetaDescription,
	generateSSRMetaTitle,
} from "../shared/utils/metaTags";
import type { GetServerSidePropsContext } from "next";

type SearchPageProps = {
	biasName: string;
	placeName: string;
};

const SearchPage = ({ biasName, placeName }: SearchPageProps) => {
	const title = generateSSRMetaTitle({
		page: "search",
		keyword: biasName || placeName,
	});
	const description = generateSSRMetaDescription({ page: "search" });

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
			<Search />
		</>
	);
};

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const { query } = context;
	const bid = query.bid as string;
	const name = query.name as string;

	const biasName = await fetchBiasNameById(Number(bid));

	return {
		props: {
			biasName: biasName || "",
			placeName: name || "",
		},
	};
};

export default SearchPage;
