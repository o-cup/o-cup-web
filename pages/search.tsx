import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Search from "../components/search";
import { generateMetaDescription } from "../components/search/hooks";
import { fetchBiasDataByKeyword } from "../shared/apis/search";
import { DEFAULT_TITLE, LOGO_URL } from "../shared/constants";
import { searchFiltersAtom } from "../shared/state";
import type { GetServerSidePropsContext } from "next";

type SearchPageProps = {
	queryKeyword: string;
	biasImgSrc: string;
};

const SearchPage = ({ queryKeyword, biasImgSrc }: SearchPageProps) => {
	const router = useRouter();
	const { pathname } = router;
	const [searchFilter, setSearchFilter] = useRecoilState(searchFiltersAtom);
	const { type, keyword } = searchFilter;
	const [url, setUrl] = useState("");

	const title = `${queryKeyword || DEFAULT_TITLE} | 검색하기`;
	const imgSrc = type === "bias" ? biasImgSrc : LOGO_URL;

	const description = generateMetaDescription({
		type,
		keyword: queryKeyword,
	});

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
				<meta
					property="og:image"
					content={type === "bias" ? imgSrc : LOGO_URL}
				/>
				<meta property="og:url" content={url} />

				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={imgSrc} />
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

	const biasData = await fetchBiasDataByKeyword(keyword);

	return {
		props: {
			queryKeyword: keyword || "",
			biasImgSrc: biasData?.profilePic || "",
		},
	};
};

export default SearchPage;
