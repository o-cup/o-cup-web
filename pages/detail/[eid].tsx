import Head from "next/head";
import React, { useEffect, useState } from "react";
import Detail from "../../components/detail";
import { fetchBiasData, fetchEventById } from "../../shared/apis/common";
import { DEFAULT_URL } from "../../shared/constants";
import {
	generateSSRMetaDescription,
	generateSSRMetaTitle,
} from "../../shared/utils/metaTags";
import type { EventType } from "../../shared/types";
import type { GetServerSidePropsContext } from "next";

type DetailPageProps = {
	detailData: EventType;
	metaData: {
		place: string;
		names: string;
		poster: string;
	};
};

const DetailPage = ({ detailData, metaData }: DetailPageProps) => {
	const [url, setUrl] = useState(DEFAULT_URL);
	const { place, names, poster } = metaData;

	const title = generateSSRMetaTitle({ page: "detail" });
	const description = generateSSRMetaDescription({
		page: "detail",
		place,
		names,
	});

	useEffect(() => {
		const baseUrl = `${window.origin}`;
		setUrl(`${baseUrl}/detail/${detailData.id}`);
	}, [metaData]);

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
			<Detail data={detailData} />
		</>
	);
};

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const eid = context.query.eid as string;
	const data = await fetchEventById({ id: eid });
	const { biasesId } = data;

	const biasesData = await Promise.all(
		biasesId.map((id: number) => fetchBiasData(id))
	);
	const names = biasesData.map((bias) => bias.name).join(", ");

	return {
		props: {
			detailData: data,
			metaData: { place: data.place, names, poster: data.images[0] },
		},
	};
};

export default DetailPage;
