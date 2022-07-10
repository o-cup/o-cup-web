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
import { getDetail, getEvents } from "../apis";

const Detail = () => {
	const { id } = useParams();

	// todo: customHook으로 만들기 useGetDetail
	const { data: event } = useQuery(["event", id], getEvents, {
		enabled: !!id,
		select: (data) => data?.find((item) => item.id === id),
	});

	const { data: detail } = useQuery(["detail", id], getDetail, {
		enabled: !!id && !!event,
		select: (data) => data?.find((item) => item.id === id),
	});

	if (!event || !detail) return null;

	const { place, bias, organizer, snsId, startAt, endAt } = event;
	const { address, goods, hashTags } = detail;

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
				/>
				<TwitterInfo organizer={organizer} snsId={snsId} hashTags={hashTags} />
				<GoodsInfo goods={goods} />
				<Location address={address} />
				<EventNearHere />
			</StyledDetail>
		</Layout>
	);
};

export default Detail;
