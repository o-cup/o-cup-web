import React from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getBiasListData } from "../../../shared/apis/common";
import { Loading } from "../../../shared/components";
import { dateFilterAtom } from "../../../shared/state";
import { StyledBiasSwiper } from "../styles/biasStyles";
import Bias from "./Bias";
import SearchIcon from "./SearchIcon";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

const BiasList = () => {
	const dateFilter = useRecoilValue(dateFilterAtom);

	const { data: biasListData, isLoading } = useQuery(
		["eventsByDate", dateFilter],
		() => getBiasListData(dateFilter),
		{
			select: (data) => {
				if (!data) return [];
				const birthdayItems = data.filter(
					(item) => item.birthday.slice(-4) === dateFilter.slice(-4)
				);
				const sortedArray = [
					...birthdayItems,
					...data.filter(
						(item) => item.birthday.slice(-4) !== dateFilter.slice(-4)
					),
				];
				return sortedArray;
			},
		}
	);

	if (isLoading) {
		return <Loading />;
	}

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
