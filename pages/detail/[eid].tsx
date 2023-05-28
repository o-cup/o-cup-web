import Head from "next/head";
import React, { useEffect, useState } from "react";
import { dehydrate, QueryClient, useQueryClient } from "react-query";
import Detail from "../../components/detail";
import { fetchBiasData, fetchEventById } from "../../shared/apis/common";
import { DEFAULT_URL } from "../../shared/constants";
import {
	generateSSRMetaDescription,
	generateSSRMetaTitle,
} from "../../shared/utils/metaTags";
import type { EventType } from "../../shared/types";
import type { GetServerSidePropsContext } from "next";

const DetailPage = () => {
	const queryClient = useQueryClient();
	const [url, setUrl] = useState(DEFAULT_URL);

	const biasNames = queryClient.getQueryData(["biasNames"]) as string[];
	const { place, images, id } = queryClient.getQueryData([
		"detail",
	]) as EventType;
	const poster = (images && images[0]) || "";

	const title = generateSSRMetaTitle({ page: "detail" });
	const description = generateSSRMetaDescription({
		page: "detail",
		place,
		names: biasNames,
	});

	useEffect(() => {
		const baseUrl = `${window.origin}`;
		setUrl(`${baseUrl}/detail/${id}`);
	}, []);

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
				<meta property="og:image" content={poster} />
				<meta property="og:url" content={url} />

				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={poster} />
				<meta name="twitter:site" content={url} />
			</Head>
			<Detail />
		</>
	);
};

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const eid = context.query.eid as string;
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(["detail"], () =>
		fetchEventById({ id: eid })
	);
	// 메타 태그 값을 위한 아티스트 이름 텍스트 캐싱
	await queryClient.prefetchQuery(["biasNames"], async () => {
		const eventData = queryClient.getQueryData(["detail"]) as EventType;
		const biases = await Promise.all(
			eventData.biasesId.map((bid) => fetchBiasData(bid.toString()))
		);
		return biases.map((b) => b.name);
	});

	const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

	return {
		props: {
			dehydratedState,
		},
	};
};

export default DetailPage;
