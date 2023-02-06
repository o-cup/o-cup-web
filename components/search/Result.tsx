import { useRouter } from "next/router";
import React, { memo, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Button, Chip, Icon, Loading, SortIcon } from "../../shared/components";
import { initialCategoryData } from "../../shared/constants";
import { searchFiltersAtom } from "../../shared/state";
import { getDateRangeText } from "../../shared/utils/dateHandlers";
import FilterBottomSheet from "./FilterBottomSheet";
import ResultEventItem from "./ResultEventItem";
import useSearchResult from "./hooks/useSearchResult";
import { StyledResult } from "./styles/resultStyle";
import type { ResultSortOptionKeys } from "../../shared/types";
import type { TempSearchFiltersType } from "./types";

const Result = () => {
	const router = useRouter();
	const [searchFilters, setSearchFilters] = useRecoilState(searchFiltersAtom);
	const {
		date: { startDate, endDate },
		districts,
		categories,
	} = searchFilters;
	const [sortOpen, setSortOpen] = useState(false);
	const [filterOpen, setFilterOpen] = useState(false);
	const [sortOption, setSortOption] =
		useState<ResultSortOptionKeys>("alphabetAsc");
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [tempSearchFilters, setTempSearchFilters] =
		useState<TempSearchFiltersType>({
			date: {
				startDate: null,
				endDate: null,
			},
			districts: [],
			categories: initialCategoryData,
		});

	const { isLoading, events, endedEvents } = useSearchResult({
		sortOption,
	});

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

	const handleFilterIconClick = () => {
		setIsFilterOpen(true);
		setTempSearchFilters(searchFilters);
	};

	const handleDeleteChip = ({
		type,
		code,
	}: {
		type: "date" | "district" | "category";
		code?: string;
	}) => {
		const newDistrictData = districts.filter((d) => d.code !== code);
		const newCategoryData = categories.map((c) => ({
			...c,
			selected: c.code === code ? false : c.selected,
		}));

		switch (type) {
			case "date":
				setSearchFilters((prev) => ({
					...prev,
					date: { startDate: null, endDate: null },
				}));
				break;

			case "district":
				setSearchFilters((prev) => ({ ...prev, districts: newDistrictData }));

				break;

			case "category":
				setSearchFilters((prev) => ({
					...prev,
					categories: newCategoryData,
				}));
				break;

			default:
				break;
		}
	};

	if (isLoading) {
		return <Loading />;
	}

	const selectedCategories = categories.filter((c) => c.selected);

	return (
		<StyledResult>
			<div className="menu">
				<p>{`검색 결과 총 ${events?.length || 0}개`}</p>
				<div className="icons">
					<Icon name="filter" handleClick={handleFilterIconClick} />
					<SortIcon
						type="result"
						isOpened={sortOpen}
						setIsOpened={setSortOpen}
						setSelectedResultOption={setSortOption}
						selectedOption={sortOption}
					/>
				</div>
			</div>

			<div className="chips">
				{startDate && endDate && (
					<Chip
						key="date"
						text={getDateRangeText(startDate, endDate)}
						handleDelete={() =>
							handleDeleteChip({
								type: "date",
							})
						}
						bgColor="white"
					/>
				)}

				{districts?.map((district) => (
					<Chip
						key={district.code}
						text={district.name}
						handleDelete={() =>
							handleDeleteChip({
								type: "district",
								code: district.code,
							})
						}
						bgColor="white"
					/>
				))}

				{selectedCategories?.map((category) => (
					<Chip
						key={category.code}
						text={category.name}
						handleDelete={() =>
							handleDeleteChip({
								type: "category",
								code: category.code,
							})
						}
						bgColor="white"
					/>
				))}
			</div>

			<ul className="events">
				{[...events, ...endedEvents]?.map((event) => (
					<ResultEventItem key={event.id} event={event} />
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

			<FilterBottomSheet
				isOpen={isFilterOpen}
				setIsOpen={setIsFilterOpen}
				tempSearchFilters={tempSearchFilters}
				setTempSearchFilters={setTempSearchFilters}
			/>
		</StyledResult>
	);
};

Result.defaultProps = {
	biasId: null,
};

export default memo(Result);
