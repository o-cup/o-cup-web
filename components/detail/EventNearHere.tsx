import { useRouter } from "next/router";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchEvents } from "../../shared/apis/common";
import { imageOnErrorHandler } from "../../shared/utils";
import {
	EventNearHereList,
	StyledEventNearHere,
} from "./styles/eventNearHereStyle";
import type { EventType } from "../../shared/types";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

function EventNearHere() {
	const router = useRouter();
	const { eid } = router.query;

	const queryClient = useQueryClient();
	const { biasesId, districts } = queryClient.getQueryData([
		"detail",
	]) as EventType;

	const { data: nearEvent } = useQuery(["event"], fetchEvents, {
		select: (data) =>
			data?.filter((item) => {
				if (biasesId && biasesId[0]) {
					return (
						item.id !== eid &&
						item.districts.name === districts?.name &&
						item.biasesId[0] === biasesId[0]
					);
				}
				return null;
			}),
	});

	if (!nearEvent || nearEvent.length === 0) {
		return null;
	}

	return (
		<StyledEventNearHere>
			<p className="title">{districts?.name || "가까운"} 연관 이벤트</p>
			<Swiper
				freeMode
				slidesPerView="auto"
				spaceBetween={20}
				slidesOffsetBefore={20}
				slidesOffsetAfter={20}
				className="nearSwiper"
				modules={[FreeMode]}
			>
				{nearEvent &&
					nearEvent.map((event) => {
						const { id: eventId, category, images, place, snsId } = event;
						const previewUrl = (images && images[0]) || "";
						return (
							<SwiperSlide key={eventId}>
								<EventNearHereList
									onClick={() => router.push(`/detail/${eventId}`)}
								>
									{previewUrl && (
										<img
											alt={previewUrl}
											src={previewUrl}
											onError={imageOnErrorHandler}
										/>
									)}
									<div>
										<div className="near_title">
											<img
												alt={category}
												src={`/images/categories/${category}.svg`}
											/>
											<p className="near_place">{place}</p>
										</div>
										<p className="near_id">@{snsId}</p>
									</div>
								</EventNearHereList>
							</SwiperSlide>
						);
					})}
			</Swiper>
		</StyledEventNearHere>
	);
}

export default EventNearHere;
