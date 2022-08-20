import React from "react";
import { useQuery } from "react-query";
import { fetchEvents } from "../../apis";
import Icon from "../../shared/components/Icon/Icons";
import { StyledResult } from "./styles/resultStyle";
import Event from "./Event";
import Button from "../../shared/components/Button";

type ResultProps = {
	keyword: string;
};

const Result = ({ keyword }: ResultProps) => {
	const { data: events } = useQuery("resultEvents", () => fetchEvents({ keyword }));

	// TODO: 데스크탑 반응형 처리
	return (
		<StyledResult>
			<div>
				<p>{`검색 결과 총 ${events?.length}개`}</p>
				<div>
					<Icon name="place " />
					<Icon name="filter" />
					<Icon name="sort" />
				</div>
			</div>

			<div className="events">
				{events?.map((event) => (
					<Event key={event.id} event={event} />
				))}
			</div>

			<div className="request">
				<p>찾고 있는 이벤트가 없나요?</p>
				<Button customStyle={{ fontWeight: "bold", width: "178px", height: "50px" }}>이벤트 등록하기</Button>
			</div>
		</StyledResult>
	);
};

export default Result;
