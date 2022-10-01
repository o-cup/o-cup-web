import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { StyledResult } from "./styles/resultStyle";
import Event from "./Event";
import Button from "../../shared/components/Button";
import { FilterIcon, SortIcon } from "../../shared/components";
import SearchModal from "./SearchModal";
import Chip from "../../shared/components/Chip";
import { searchFiltersAtom } from "../../state";
import { convertDateWithDots } from "../../shared/utils/dateHandlers";
import { fetchSearchedEvent } from "../../apis/search";
import { RegCodeItem } from "./types";
import Loading from "../../shared/components/Loading";
import { ResultSortOptionKeys } from "../../types";

type ResultProps = {
	biasId?: number | null;
};

const initialChipsData = { dateChip: "", distChips: [] };

const Result = ({ biasId }: ResultProps) => {
	const navigate = useNavigate();
	const [searchFilters, setSearchFilters] = useRecoilState(searchFiltersAtom);
	const {
		keyword,
		date: { startDate, endDate },
		districts,
	} = searchFilters;
	const [sortOpen, setSortOpen] = useState(false);
	const [filterOpen, setFilterOpen] = useState(false);
	const [calendarOpen, setCalendarOpen] = useState(false);
	const [selectedSortOption, setSelectedSortOption] = useState<ResultSortOptionKeys>("alphabetAsc");
	const [districtSelectorOpen, setDistrictSelectorOpen] = useState(false);
	const [chips, setChips] = useState<{ dateChip: string; distChips: RegCodeItem[] }>(initialChipsData);

	const isModalOpen = calendarOpen || districtSelectorOpen;
	const dateChipText = startDate && `${convertDateWithDots(startDate)} ~ ${convertDateWithDots(endDate)}`;

	const { data: events, isLoading } = useQuery(
		["resultEvents", keyword, startDate, endDate, biasId, districts, selectedSortOption],
		() => fetchSearchedEvent({ keyword, date: { startDate, endDate }, biasId, districts }),
		{
			select: (data) => {
				const eventsData = data?.map((e) => {
					const event = { ...e, image: e.images[0] };
					delete event.images;
					return event;
				});

				switch (selectedSortOption) {
					case "dateAsc":
						return eventsData?.sort((a, b) => a.startAt - b.startAt);

					case "dateDsc":
						return eventsData?.sort((a, b) => b.startAt - a.startAt);

					case "alphabetAsc":
					default:
						return eventsData;
				}
			},
			enabled: !!keyword,
		}
	);

	useEffect(() => {
		if (!startDate) return;

		const dateText = startDate && `${convertDateWithDots(startDate)} ~ ${convertDateWithDots(endDate)}`;
		setChips((prev) => ({ ...prev, dateChip: dateText }));
	}, [startDate, endDate]);

	useEffect(() => {
		setChips((prev) => ({ ...prev, distChips: districts }));
	}, [districts]);

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

	const handleDeleteChip = ({ type, code }: { type: "date" | "district"; code?: string }) => {
		const newDistChips = chips.distChips.filter((chip) => chip.code !== code);

		switch (type) {
			case "date":
				setChips((prev) => ({ ...prev, dateChip: "" }));

				setSearchFilters((prev) => ({ ...prev, date: { startDate: "", endDate: "" } }));
				break;

			case "district":
				setSearchFilters((prev) => ({ ...prev, districts: newDistChips }));
				break;

			default:
				break;
		}
	};

	const chip = chips.dateChip || chips.distChips.length > 0;

	if (isLoading) {
		return <Loading />;
	}

	return (
		<StyledResult>
			<div className="menu">
				<p>{`검색 결과 총 ${events?.length || 0}개`}</p>
				<div className="icons">
					<FilterIcon
						isOpened={filterOpen}
						setIsOpened={setFilterOpen}
						setCalendarOpen={setCalendarOpen}
						setDistrictSelectorOpen={setDistrictSelectorOpen}
					/>
					<SortIcon
						type="result"
						isOpened={sortOpen}
						setIsOpened={setSortOpen}
						setSelectedResultOption={setSelectedSortOption}
						selectedOption={selectedSortOption}
					/>
				</div>
			</div>

			{chip && (
				<div className="chips">
					{chips.dateChip && (
						<Chip
							text={dateChipText}
							bgColor="primary"
							customStyle={{ fontSize: "12px" }}
							handleDelete={() => handleDeleteChip({ type: "date" })}
						/>
					)}
					{chips.distChips.map((dist) => (
						<Chip
							key={dist.code}
							text={dist.name}
							bgColor="primary"
							handleDelete={() => handleDeleteChip({ type: "district", code: dist.code })}
						/>
					))}
				</div>
			)}

			<ul className="events">
				{events?.map((event) => (
					<Event key={event.id} event={event} />
				))}
			</ul>

			<div className="request">
				<p>찾고 있는 이벤트가 없나요?</p>
				<Button
					customStyle={{ fontWeight: "bold", width: "178px", height: "50px" }}
					handleClick={() => navigate("/request")}
				>
					이벤트 등록하기
				</Button>
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

Result.defaultProps = {
	biasId: null,
};

export default memo(Result);
