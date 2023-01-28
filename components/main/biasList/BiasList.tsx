import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchPeople } from "../../../shared/apis/common";
import { Loading } from "../../../shared/components";
import { openedBiasAtom, dateFilterAtom } from "../../../shared/state";
import { StyledBiasSwiper } from "../styles/biasStyles";
import Bias from "./Bias";
import SearchIcon from "./SearchIcon";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

const BiasList = () => {
	const queryClient = useQueryClient();
	const openedBias = useRecoilValue(openedBiasAtom);
	const dateFilter = useRecoilValue(dateFilterAtom);

	const { data: people, isLoading } = useQuery(
		["people", dateFilter],
		() => fetchPeople(),
		{
			select: (data) => {
				const biasesData =
					data?.filter((item) => openedBias.includes(item.id)) || [];

				const birthdayPeople = biasesData?.filter(
					(bias) => bias.birthday.slice(-4) === dateFilter.slice(-4)
				);
				const biases = biasesData.filter(
					(bias) => !birthdayPeople.includes(bias)
				);

				return [...birthdayPeople, ...biases];
			},
			initialData: queryClient.getQueryData("people"),
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
				{people && people?.length ? (
					people.map((person) => (
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
