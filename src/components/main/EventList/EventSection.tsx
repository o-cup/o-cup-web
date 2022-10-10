import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { fetchEvents, fetchPeople } from "../../../apis";
import { openedBiasAtom, dateFilterAtom } from "../../../state/atoms";
import { StyledMainEvents } from "./mainEventListStyles";
import EmptyDefault from "../EmptyDefault";
import Loading from "../../../shared/components/Loading";
import BiasEventList from "./BiasEventList";

const EventSection = () => {
	const dateFilter = useRecoilValue(dateFilterAtom);
	const [openedBias, setOpenedBias] = useRecoilState(openedBiasAtom);

	const { data: events, isLoading } = useQuery(["events", dateFilter], () =>
		fetchEvents({
			date: dateFilter,
		})
	);

	const { data: openedPeople } = useQuery(["bias", openedBias], () => fetchPeople(), {
		select: (data) => {
			const birthdayPeople =
				data?.filter((bias) => openedBias.includes(bias.id) && bias.birthday.slice(-4) === dateFilter.slice(-4)) || [];
			const noneBirthdayPeople =
				data?.filter((bias) => openedBias.includes(bias.id) && bias.birthday.slice(-4) !== dateFilter.slice(-4)) || [];

			return [...birthdayPeople, ...noneBirthdayPeople];
		},
	});

	/** 이벤트 목록에서 인물 id 추출 */
	useEffect(() => {
		const biasArr: number[] = [];
		if (events) {
			events.forEach((event) => biasArr.push(...event.biasesId));
		}
		const biasSet = new Set(biasArr);
		setOpenedBias(Array.from(biasSet));
	}, [events, setOpenedBias]);

	if (isLoading) {
		return <Loading />;
	}
	return (
		<>
			<StyledMainEvents>
				{openedPeople?.map((bias) => (
					<BiasEventList
						key={bias.id}
						id={`bias_${bias.id}`}
						bias={bias}
						events={events ? events.filter((event) => event.biasesId.includes(bias.id)) : []}
					/>
				))}
			</StyledMainEvents>
			<EmptyDefault size={events && events.length > 0 ? "small" : "default"} />
		</>
	);
};
export default EventSection;
