import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { fetchEvents, fetchPeople } from "../../shared/apis/common";
import { Loading } from "../../shared/components";
import { dateFilterAtom, openedBiasAtom } from "../../shared/state";
import {
	convertDateToString,
	convertStringToDate,
	isBeforeToday,
} from "../../shared/utils/dateHandlers";
import BiasEventList from "./BiasEventList";
import EmptyDefault from "./EmptyDefault";
import { StyledMainEvents } from "./styles/mainEventListStyles";
import type { PeopleType } from "../../shared/types";

const EventSection = () => {
	const dateFilter = useRecoilValue(dateFilterAtom);
	const [openedBias, setOpenedBias] = useRecoilState(openedBiasAtom);

	const { data: events, isLoading } = useQuery(
		["events", dateFilter],
		() =>
			fetchEvents({
				date: dateFilter,
			}),
		{
			select: (data) => data?.map((e) => ({ ...e, image: e.images[0] })),
		}
	);

	const { data: openedPeople } = useQuery(
		["bias", openedBias],
		() => fetchPeople(),
		{
			select: (data) => {
				const birthdayPeople =
					data?.filter(
						(bias) =>
							openedBias.includes(bias.id) &&
							bias.birthday.slice(-4) === dateFilter.slice(-4)
					) || [];
				const noneBirthdayPeople =
					data?.filter(
						(bias) =>
							openedBias.includes(bias.id) &&
							bias.birthday.slice(-4) !== dateFilter.slice(-4)
					) || [];

				return [...birthdayPeople, ...noneBirthdayPeople];
			},
		}
	);

	/** 이벤트 목록에서 인물 id 추출 */
	useEffect(() => {
		const biasArr: number[] = [];
		if (events) {
			events.forEach((event) => biasArr.push(...event.biasesId));
		}
		const biasSet = new Set(biasArr);
		setOpenedBias(Array.from(biasSet));
	}, [events, setOpenedBias]);

	const isToday = dateFilter === convertDateToString(new Date());
	const monthIndex = convertStringToDate(dateFilter).getMonth();
	const date = convertStringToDate(dateFilter).getDate();

	const getEventTitle = (bias: PeopleType) =>
		`${isToday ? "오늘" : `${date}일에`} ${
			isBeforeToday(dateFilter) ? "열린" : "열리는"
		} ${bias.name} 이벤트`;

	if (isLoading) {
		return <Loading />;
	}
	return (
		<>
			<StyledMainEvents>
				{openedPeople?.map((bias) => (
					<div key={bias.id} id={`bias_${bias.id}`}>
						<p>{getEventTitle(bias)}</p>
						<BiasEventList
							events={
								events
									? events.filter((event) => event.biasesId.includes(bias.id))
									: []
							}
						/>
					</div>
				))}
			</StyledMainEvents>
			<EmptyDefault size={events && events.length > 0 ? "small" : "default"} />
		</>
	);
};
export default EventSection;
