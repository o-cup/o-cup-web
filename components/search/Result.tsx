import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { memo, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { fetchSearchedEvents } from "../../shared/apis/search";
import {
	Button,
	Chip,
	FilterIcon,
	Loading,
	SortIcon,
} from "../../shared/components";
import { searchFiltersAtom, searchInputOptionsAtom } from "../../shared/state";
import { convertDateWithDots, removeSpace } from "../../shared/utils";
import Event from "./Event";
import SearchModal from "./SearchModal";
import { StyledResult } from "./styles/resultStyle";
import type { ResultSortOptionKeys } from "../../shared/types";
import type { RegCodeItem } from "./types";

type ResultProps = {
	biasId?: number | null;
};

const initialChipsData = { dateChip: "", distChips: [] };

const Result = ({ biasId }: ResultProps) => {
	const router = useRouter();
	const [searchFilters, setSearchFilters] = useRecoilState(searchFiltersAtom);
	const {
		searchType,
		bid,
		keyword,
		date: { startDate, endDate },
		districts,
	} = searchFilters;
	const [sortOpen, setSortOpen] = useState(false);
	const [filterOpen, setFilterOpen] = useState(false);
	const [calendarOpen, setCalendarOpen] = useState(false);
	const [selectedSortOption, setSelectedSortOption] =
		useState<ResultSortOptionKeys>("alphabetAsc");
	const [districtSelectorOpen, setDistrictSelectorOpen] = useState(false);
	const [chips, setChips] = useState<{
		dateChip: string;
		distChips: RegCodeItem[];
	}>(initialChipsData);
	const searchInputOptions = useRecoilValue(searchInputOptionsAtom);
	const searchInputOptionKey = searchInputOptions.find((o) => o.selected)?.key;

	const isModalOpen = calendarOpen || districtSelectorOpen;
	const dateChipText =
		startDate &&
		`${convertDateWithDots(startDate)} ~ ${convertDateWithDots(endDate)}`;

	const { data: events, isLoading } = useQuery(
		[
			"resultEvents",
			searchType,
			keyword,
			bid,
			startDate,
			endDate,
			districts,
			selectedSortOption,
			searchInputOptionKey,
		],
		() =>
			fetchSearchedEvents({
				searchType,
				keyword: removeSpace(keyword.trim()),
				bid: bid!,
				date: { startDate, endDate },
				biasId,
				districts,
				searchInputOptionKey,
			}),
		{
			select: (data) => {
				const eventsData = data
					?.map((e) => {
						const today = format(new Date(), "yyyyMMdd");
						const isEnd = today > e.endAt!;

						const event = { ...e, image: e.images[0], isEnd };
						delete event.images;
						return event;
					})
					.sort((a) => (a.isEnd ? 1 : -1));

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

		const dateText =
			startDate &&
			`${convertDateWithDots(startDate)} ~ ${convertDateWithDots(endDate)}`;
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

	const handleDeleteChip = ({
		type,
		code,
	}: {
		type: "date" | "district";
		code?: string;
	}) => {
		const newDistChips = chips.distChips.filter((chip) => chip.code !== code);

		switch (type) {
			case "date":
				setChips((prev) => ({ ...prev, dateChip: "" }));

				setSearchFilters((prev) => ({
					...prev,
					date: { startDate: "", endDate: "" },
				}));
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
							handleDelete={() =>
								handleDeleteChip({ type: "district", code: dist.code })
							}
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
				<img src="/images/pin_cone.png" alt="request" />
				<Button
					customStyle={{ fontWeight: "bold", width: "178px", height: "50px" }}
					handleClick={() => router.push("/request")}
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
