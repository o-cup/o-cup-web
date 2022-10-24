import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Search from "../components/search";
import { DEFAULT_TITLE, LOGO_URL } from "../shared/constants";
import { searchFiltersAtom } from "../shared/state";
import type { GetServerSidePropsContext } from "next";
// import type { GetServerSidePropsContext } from "next";

const SearchPage = ({ queryKeyword }: { queryKeyword: string }) => {
	const router = useRouter();
	const { pathname } = router;
	const [searchFilter, setSearchFilter] = useRecoilState(searchFiltersAtom);
	const { keyword } = searchFilter;
	const [url, setUrl] = useState("");

	const title = `${queryKeyword || DEFAULT_TITLE} | 검색하기`;
	const description = `${
		queryKeyword || "응원하는 아티스트"
	}의 생일 이벤트를 검색해보세요!`;

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
				<meta property="og:image" content={LOGO_URL} />
				<meta property="og:url" content={url} />

				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={LOGO_URL} />
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
