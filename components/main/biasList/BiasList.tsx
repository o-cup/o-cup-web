import React from "react";
import { useQueryClient } from "react-query";
import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { StyledBiasSwiper } from "../styles/biasStyles";
import Bias from "./Bias";
import SearchIcon from "./SearchIcon";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import type { PeopleType } from "../../../shared/types";

const BiasList = () => {
	const queryClient = useQueryClient();
	// const dateFilter = useRecoilValue(dateFilterAtom);

	const biasListData = queryClient.getQueryData([
		"biasListByDate",
	]) as PeopleType[];

	return (
		<StyledBiasSwiper>
			<Swiper
				freeMode
				slidesPerView="auto"
				spaceBetween={14}
				slidesOffsetBefore={20}
				slidesOffsetAfter={20}
				className="biasSwiper"
				modules={[FreeMode]}
			>
				{biasListData && biasListData?.length ? (
					biasListData.map((person) => (
						<SwiperSlide key={person.id}>
							<Bias
								id={person.id}
								name={person.name}
								profilePic={person.profilePic}
								birthday={person.birthday}
							/>
						</SwiperSlide>
					))
				) : (
					<SwiperSlide>
						<SearchIcon />
					</SwiperSlide>
				)}
			</Swiper>
		</StyledBiasSwiper>
	);
};

export default BiasList;
