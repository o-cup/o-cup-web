import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { fetchEvents } from "../../apis";
import { StyledResult } from "./styles/resultStyle";
import Event from "./Event";
import Button from "../../shared/components/Button";
import { FilterIcon, SortIcon } from "../../shared/components";
import SearchModal from "./SearchModal";
import Chip from "../../shared/components/Chip";
import { dateRangeAtom, districtAtom } from "../../state";
import { convertDateWithDots } from "../../shared/utils/dateHandlers";

type ResultProps = {
	keyword: string;
};

const sortOptions = {
	dateAsc: "날짜: 빠른 순",
	dateDsc: "날짜: 느린 순",
	alphabetAsc: "카페: 가나다순",
};

type ChipType = {
	dateChip: string;
	distChips: string[];
};

const Result = ({ keyword }: ResultProps) => {
	const [dateRange, setDateRange] = useRecoilState(dateRangeAtom);
	const { startDate, endDate } = dateRange;
	const [districts, setDistricts] = useRecoilState(districtAtom);
	const [sortOpen, setSortOpen] = useState(false);
	const [filterOpen, setFilterOpen] = useState(false);
	const [calendarOpen, setCalendarOpen] = useState(false);
	const [districtSelectorOpen, setDistrictSelectorOpen] = useState(false);
	const isModalOpen = calendarOpen || districtSelectorOpen;
	const dateChipText = startDate && `${convertDateWithDots(startDate)} ~ ${convertDateWithDots(endDate)}`;

	const [chips, setChips] = useState<ChipType>({ dateChip: "", distChips: [] });

	const { data: events } = useQuery("resultEvents", () => fetchEvents({ keyword }));

	useEffect(() => {
		if (!startDate) return;

		const dateText = startDate && `${convertDateWithDots(startDate)} ~ ${convertDateWithDots(endDate)}`;
		setChips((prev) => ({ ...prev, dateChip: dateText }));
	}, [startDate, endDate]);

	useEffect(() => {
		if (districts.length) {
			setChips((prev) => ({ ...prev, distChips: districts }));
		}
	}, [districts, setDistricts]);

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

	const handleDeleteChip = ({ type }: { type: "date" | "district" }) => {
		switch (type) {
			case "date":
				setChips((prev) => ({ ...prev, dateChip: "" }));
				setDateRange((prev) => ({ ...prev, startDate: "", endDate: "" }));
				break;

			case "district":
				break;

			default:
				break;
		}
	};

	const chip = chips.dateChip || chips.distChips.length > 0;

	return (
		<StyledResult>
			<div className="menu">
				<p>{`검색 결과 총 ${events?.length || 0}개`}</p>
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

			{chip && (
				<div className="chips">
					{chips.dateChip && (
						<Chip text={dateChipText} bgColor="primary" handleDelete={() => handleDeleteChip({ type: "date" })} />
					)}
					{chips.distChips.map((dist) => (
						<Chip
							key={dist}
							text={dist}
							bgColor="primary"
							handleDelete={() => handleDeleteChip({ type: "district" })}
						/>
					))}
				</div>
			)}

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
				<SearchModal
					type={calendarOpen ? "calendar" : "districtSelector"}
					setCalendarOpen={setCalendarOpen}
					setDisctrictSelectorOpen={setDistrictSelectorOpen}
				/>
			)}
		</StyledResult>
	);
};

export default Result;
