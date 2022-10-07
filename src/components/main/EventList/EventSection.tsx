import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { fetchEvents, fetchPeople } from "../../../apis";
import { openedBiasAtom, dateFilterAtom } from "../../../state/atoms";
import { StyledMainEvents } from "./mainEventListStyles";
import EmptyDefault from "../EmptyDefault";
import Loading from "../../../shared/components/Loading";
import BiasEventList from "./BiasEventList";

// todo: useInfiniteQuery 리팩토링 후 추가
const EventSection = () => {
	const dateFilter = useRecoilValue(dateFilterAtom);
	const [openedBias, setOpenedBias] = useRecoilState(openedBiasAtom);

	const { data: events, isLoading } = useQuery(["events", dateFilter], () =>
		fetchEvents({
			date: dateFilter,
		})
	);

	const { data: people } = useQuery(["bias"], () => fetchPeople());

	/** 이벤트 목록에서 인물 id 추출 */
	useEffect(() => {
		const biasArr: number[] = [];
		if (events) {
			events.forEach((event) => biasArr.push(...event.biasesId));
		}
		const biasSet = new Set(biasArr);
		setOpenedBias(Array.from(biasSet));
	}, [events, setOpenedBias]);

	const getBiasName = (biasId: number) => people?.filter((p) => p.id === biasId)[0].name;

	if (isLoading) {
		return <Loading />;
	}
	return (
		<>
			<StyledMainEvents>
				{openedBias.map((bias) => (
					<div key={bias}>
						<p>오늘 열린 {getBiasName(bias)} 이벤트</p>
						<BiasEventList events={events ? events.filter((event) => event.biasesId.includes(bias)) : []} />
					</div>
				))}
			</StyledMainEvents>
			<EmptyDefault size={events && events.length > 0 ? "small" : "default"} />
		</>
	);
};
export default EventSection;
