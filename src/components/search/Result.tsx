import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchEvents } from "../../apis";
import { StyledResult } from "./styles/resultStyle";
import Event from "./Event";
import Button from "../../shared/components/Button";
import { FilterIcon, SortIcon } from "../../shared/components";
import SearchModal from "./SearchModal";

type ResultProps = {
	keyword: string;
};

const sortOptions = {
	dateAsc: "날짜: 빠른 순",
	dateDsc: "날짜: 느린 순",
	alphabetAsc: "카페: 가나다순",
};

const Result = ({ keyword }: ResultProps) => {
	const [sortOpen, setSortOpen] = useState(false);
	const [filterOpen, setFilterOpen] = useState(false);

	const [calendarOpen, setCalendarOpen] = useState(false);
	const [districtSelectorOpen, setDistrictSelectorOpen] = useState(false);

	const { data: events } = useQuery("resultEvents", () => fetchEvents({ keyword }));

	useEffect(() => {
		if (sortOpen) {
			setFilterOpen(false);
		}
	}, [sortOpen]);

	useEffect(() => {
		if (filterOpen) {
			setSortOpen(false);
		}
	}, [filterOpen]);

	const closeModal = () => {
		setCalendarOpen(false);
		setDistrictSelectorOpen(false);
	};

	const isModalOpen = calendarOpen || districtSelectorOpen;

	// TODO: 데스크탑 반응형 처리
	return (
		<StyledResult>
			<div className="menu">
				<p>{`검색 결과 총 ${events?.length}개`}</p>
				<div className="icons">
					{/* <Icon name="place " /> */}
					<FilterIcon
						isOpened={filterOpen}
						setIsOpened={setFilterOpen}
						setCalendarOpen={setCalendarOpen}
						setDistrictSelectorOpen={setDistrictSelectorOpen}
					/>
					<SortIcon options={sortOptions} isOpened={sortOpen} setIsOpened={setSortOpen} />
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

			{isModalOpen && (
				<SearchModal type={calendarOpen ? "calendar" : "districtSelector"} handleCloseModal={closeModal} />
			)}
		</StyledResult>
	);
};

export default Result;
