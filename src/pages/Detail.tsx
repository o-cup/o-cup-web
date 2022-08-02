import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Layout from "../components/layout";
import EventMain from "../components/EventMain";
import { StyledDetail } from "../styles/detailStyle";
import TwitterInfo from "../components/TwitterInfo";
import GoodsInfo from "../components/GoodsInfo";
import Location from "../components/Location";
import EventNearHere from "../components/EventsNearHere";
import { fetchEvents, fetchDetail } from "../apis";

const Detail = () => {
	const { id } = useParams();

	const { data: event } = useQuery(["event", id], () => fetchEvents({ infinite: true }), {
		enabled: !!id,
		select: (data) => data?.find((item) => item.id === id),
	});

	const { data: detail } = useQuery(["detail", id], () => fetchDetail({ id }), {
		enabled: !!id && !!event,
	});

	if (!event || !detail) return null;

	const { place, bias, organizer, snsId, startAt, endAt, images, district } = event;
	const { address, goods, hashTags, tweetUrl } = detail;

	return (
		<Layout>
			<StyledDetail>
				<EventMain
					place={place}
					bias={bias}
					organizer={organizer}
					snsId={snsId}
					startAt={startAt}
					endAt={endAt}
					address={address}
					images={images}
				/>
				<TwitterInfo organizer={organizer} snsId={snsId} hashTags={hashTags} />
				<GoodsInfo goods={goods} tweetUrl={tweetUrl}/>
				<Location address={address} />
				<EventNearHere bias={bias} district={district} />
			</StyledDetail>
		</Layout>
	);
};

export default Detail;
