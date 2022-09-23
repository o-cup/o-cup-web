import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { StyledMapResult } from "../styles/mapStyle";
import { EventType } from "../../../types";
import Event from "../../search/Event";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

type MapProps = {
	events: EventType[];
};

const MapResult = ({ events }: MapProps) => {
	const navigate = useNavigate();

	return (
		<StyledMapResult>
			<div className="filterContainer">
				<div>오늘 여는 곳</div>
				<div>날짜 선택</div>
				<div>지역 선택</div>
			</div>

			<div className="eventsContainer">
				<Swiper
					spaceBetween={-24}
					slidesPerView="auto"
					centeredSlides
					onSlideChange={() => console.log("slide change")}
					onSwiper={(swiper) => console.log(swiper)}
				>
					{events?.map((event) => (
						<SwiperSlide key={event.id}>
							<Event event={event} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</StyledMapResult>
	);
};

export default MapResult;
