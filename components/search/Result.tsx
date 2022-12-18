import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { memo, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Button, Chip, Icon, Loading, SortIcon } from "../../shared/components";
import { searchFiltersAtom } from "../../shared/state";
import Event from "./Event";
import FilterBottomSheet from "./FilterBottomSheet";
import SearchModal from "./SearchModal";
import useSearchResult from "./hooks/useSearchResult";
import { StyledResult } from "./styles/resultStyle";
import type { ResultSortOptionKeys } from "../../shared/types";
import type { DistrictType } from "./types";

const initialChipsData = { dateChip: "", distChips: [] };

const Result = () => {
	const router = useRouter();
	const [searchFilters, setSearchFilters] = useRecoilState(searchFiltersAtom);
	const {
		date: { startDate, endDate },
		districts,
	} = searchFilters;
	const [sortOpen, setSortOpen] = useState(false);
	const [filterOpen, setFilterOpen] = useState(false);
	const [calendarOpen, setCalendarOpen] = useState(false);
	const [sortOption, setSortOption] =
		useState<ResultSortOptionKeys>("alphabetAsc");
	const [districtSelectorOpen, setDistrictSelectorOpen] = useState(false);
	const [chips, setChips] = useState<{
		dateChip: string;
		distChips: DistrictType[];
	}>(initialChipsData);
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const isModalOpen = calendarOpen || districtSelectorOpen;

	const dateChipText =
		(startDate &&
			endDate &&
			`${format(new Date(startDate), "yyyy.MM.dd")} - ${format(
				new Date(endDate),
				"yyyy.MM.dd"
			)}`) ||
		"";

	const { isLoading, events } = useSearchResult({
		sortOption,
	});

	useEffect(() => {
		if (dateChipText) {
			setChips((prev) => ({ ...prev, dateChip: dateChipText }));
		}
	}, [startDate, endDate]);

	useEffect(() => {
		if (districts.length) {
			setChips((prev) => ({ ...prev, distChips: districts }));
		}
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
					date: { startDate: null, endDate: null },
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
					<Icon name="filter" handleClick={() => setIsFilterOpen(true)} />
					<SortIcon
						type="result"
						isOpened={sortOpen}
						setIsOpened={setSortOpen}
						setSelectedResultOption={setSortOption}
						selectedOption={sortOption}
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

			<FilterBottomSheet isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} />
		</StyledResult>
	);
};

Result.defaultProps = {
	biasId: null,
};

export default memo(Result);
