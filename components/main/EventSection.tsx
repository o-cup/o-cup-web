import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import { openedBiasAtom } from "../../shared/state";
import EmptyDefault from "./EmptyDefault";
import EventList from "./EventList";
import { StyledMainEventSection } from "./styles/mainEventListStyles";
import type { EventType, PeopleType } from "../../shared/types";

const EventSection = () => {
	const queryClient = useQueryClient();
	const setOpenedBias = useSetRecoilState(openedBiasAtom);

	const events = queryClient.getQueryData("eventListByDate") as EventType[];
	const biasList = queryClient.getQueryData("biasListByDate") as PeopleType[];

	/** 이벤트 목록에서 인물 id 추출 */
	useEffect(() => {
		const biasArr: number[] = [];
		if (events) {
			events.forEach((event) => biasArr.push(...event.biasesId));
		}
		const biasSet = new Set(biasArr);
		setOpenedBias(Array.from(biasSet));
	}, [events, setOpenedBias]);

	return (
		<>
			<StyledMainEventSection>
				{biasList?.map((item) => (
					<EventList
						biasData={item}
						key={item.id}
						id={`bias_${item.id}`}
						events={
							events
								? events.filter((event) => event.biasesId.includes(item.id))
								: []
						}
					/>
				))}
			</StyledMainEventSection>
			{biasList?.length ? (
				<EmptyDefault
					size={events && events.length > 0 ? "small" : "default"}
				/>
			) : null}
		</>
	);
};
export default EventSection;
