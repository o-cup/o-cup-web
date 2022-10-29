import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Search from "../components/search";
import { LOGO_URL } from "../shared/constants";
import { searchFiltersAtom, searchInputOptionsAtom } from "../shared/state";
import {
	generateSSRMetaDescription,
	generateSSRMetaTitle,
} from "../shared/utils/metaTags";
import type { GetServerSidePropsContext } from "next";

type SearchPageProps = {
	queryKeyword: string;
	biasImgSrc: string;
};

const SearchPage = ({ queryKeyword, biasImgSrc }: SearchPageProps) => {
	const router = useRouter();
	const { pathname } = router;
	const [searchFilter, setSearchFilter] = useRecoilState(searchFiltersAtom);
	const { keyword } = searchFilter;
	const selectOptions = useRecoilValue(searchInputOptionsAtom);
	const [url, setUrl] = useState("");

	const selectOptionKey = selectOptions.find((o) => o.selected)?.key || "bias";

	const title = generateSSRMetaTitle({ page: "search", keyword: queryKeyword });
	const imgSrc = selectOptionKey === "bias" && keyword ? biasImgSrc : LOGO_URL;

	const description = generateSSRMetaDescription({ page: "search" });

	useEffect(() => {
		const baseUrl = `${window.origin}/search`;
		setUrl(keyword ? `${baseUrl}?keyword=${queryKeyword}` : baseUrl);
	}, [queryKeyword]);

	useEffect(() => {
		setSearchFilter((prev) => ({
			...prev,
			keyword: queryKeyword,
		}));

		router.push({
			pathname,
			query: { keyword: queryKeyword },
		});
	}, [queryKeyword]);

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
				<meta property="og:image" content={imgSrc || LOGO_URL} />
				<meta property="og:url" content={url} />

				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={imgSrc || LOGO_URL} />
				<meta name="twitter:site" content={url} />
			</Head>
			<Search />
		</>
	);
};

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const { query } = context;
	const keyword = query.keyword as string;

	return {
		props: {
			queryKeyword: keyword || "",
		},
	};
};

export default SearchPage;
