import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Detail from "../../components/detail";
import { fetchBiasData, fetchEventById } from "../../shared/apis/common";
import { DEFAULT_TITLE, DEFAULT_URL } from "../../shared/constants";
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

	const title = `${DEFAULT_TITLE} | 상세보기`;
	const description = `${place}에서 열리는 ${names}의 이벤트를 오늘의 컵홀더에서 확인해보세요!`;

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
					content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
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
			<Detail data={detailData} />;
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
