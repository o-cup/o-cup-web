import { format } from "date-fns";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { BottomSheet, Calendar, Icon } from "../../../shared/components";
import { searchFiltersAtom } from "../../../shared/state";
import { ResetButton } from "../styles/searchStyle";
import Categories from "./Categories";
import DistrictSelector from "./DistrictSelector";
import Filter from "./Filter";
import {
	StyledCustomHeader,
	StyledFilterBottomSheet,
} from "./styles/filterBottomSheetStyle";
import type { DateRangeType } from "../../../shared/types";
import type {
	CategoriesStateType,
	DistrictType,
	FilterBottomSheetProps,
	FiltersType,
	TempSearchFiltersType,
} from "../types";

const filterData = {
	calendar: {
		icon: "calendar",
		name: "날짜",
	},
	district: {
		icon: "place",
		name: "지역",
	},
	category: {
		icon: "category",
		name: "이벤트 종류",
	},
} as FiltersType;

const initialCategoryData = {
	A: false,
	B: false,
	C: false,
	D: false,
	E: false,
};

const FilterBottomSheet = ({ isOpen, setIsOpen }: FilterBottomSheetProps) => {
	const [currentFilter, setCurrentFilter] = useState<string | null>(null);
	const [selectedRange, setSelectedRange] = useState<DateRangeType>({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});
	const [selectedDists, setSelectedDists] = useState<DistrictType[]>([]);
	const [categories, setCategories] =
		useState<CategoriesStateType>(initialCategoryData);
	const [searchFilters, setSearchFilters] = useRecoilState(searchFiltersAtom);
	const [tempSearchFilters, setTempSearchFilters] =
		useState<TempSearchFiltersType>({
			date: {
				startDate: null,
				endDate: null,
			},
			districts: [],
			categories: initialCategoryData,
		});

	console.log("selectedDists", selectedDists);

	const handleResetClick = () => {
		if (!currentFilter) {
			setTempSearchFilters((prev) => ({
				...prev,
				date: {
					startDate: null,
					endDate: null,
				},
				districts: [],
				categories: {
					A: false,
					B: false,
					C: false,
					D: false,
					E: false,
				},
			}));

			setSelectedRange((prev) => ({
				...prev,
				startDate: new Date(),
				endDate: new Date(),
			}));

			return;
		}

		switch (currentFilter) {
			case "calendar":
				console.log("달력 초기화");
				setSelectedRange((prev) => ({
					...prev,
					startDate: new Date(),
					endDate: new Date(),
				}));
				break;

			default:
				break;
		}
	};

	const headerElements = (
		<StyledCustomHeader>
			{/* <Icon name="arrow-left" handleClick={() => setCurrentFilter(null)} /> */}
			<h2>{currentFilter ? filterData[currentFilter].name : "필터"}</h2>
			<ResetButton onClick={handleResetClick} className="reset">
				<Icon name="reset" />
				<span>초기화</span>
			</ResetButton>
		</StyledCustomHeader>
	);

	const handleSubmitClick = () => {
		if (!currentFilter) {
			setSearchFilters((prev) => ({
				...prev,
				date: {
					...tempSearchFilters.date,
				},
				districts: tempSearchFilters.districts,
				categories,
			}));
			setIsOpen(false);
			return;
		}

		setCurrentFilter(null);

		switch (currentFilter) {
			case "calendar":
				setTempSearchFilters((prev) => ({
					...prev,
					date: {
						startDate: selectedRange.startDate,
						endDate: selectedRange.endDate,
					},
				}));
				break;

			case "district":
				setTempSearchFilters((prev) => ({
					...prev,
					districts: selectedDists,
				}));
				break;

			default:
				break;
		}
	};

	const handleClickLeftButton = () => {
		if (currentFilter) {
			setCurrentFilter(null);
		} else {
			// setTempSearchFilters((prev) => ({
			// 	...prev,
			// 	date: {
			// 		startDate: null,
			// 		endDate: null,
			// 	},
			// 	districts: [],
			// 	categories: initialCategoryData,
			// }));

			setIsOpen(false);
		}

		if (!currentFilter) {
			setIsOpen(false);
			return;
		}

		setCurrentFilter(null);

		switch (currentFilter) {
			case "calendar":
				setSelectedRange((prev) => ({
					...prev,
					startDate: new Date(),
					endDate: new Date(),
				}));
				break;

			case "district":
				setSelectedDists([]);
				break;

			default:
				break;
		}
	};

	const buttonElements = (
		<div className="buttons">
			<button type="button" onClick={handleClickLeftButton} className="close">
				{currentFilter ? "이전" : "닫기"}
			</button>
			<button type="button" onClick={handleSubmitClick}>
				적용하기
			</button>
		</div>
	);

	const generateSelectedCreteriasText = (filterType: string) => {
		let text = "미선택";

		const { date, districts } = tempSearchFilters;
		const { startDate, endDate } = date;
		// const selectedCategories = searchFilters.categories;

		// const selectedCategories = Object.keys(categories).filter(
		// 	(c) => searchFilters.categories[c]
		// );

		// console.log("selectedCategories", selectedCategories);

		switch (filterType) {
			case "calendar":
				if (startDate && endDate) {
					text = `${format(new Date(startDate), "yyyy.MM.dd")} - ${format(
						new Date(endDate),
						"yyyy.MM.dd"
					)}`;
				}
				break;

			case "district":
				if (districts.length > 0) {
					text = districts.map((dist) => dist.name).join(", ");
				}
				break;

			case "category":
				break;

			default:
				break;
		}
		return text;
	};

	return (
		<BottomSheet
			open={isOpen}
			setOpen={() => setIsOpen(false)}
			customHeader={headerElements}
			close
			slider
			customButtons={buttonElements}
		>
			<StyledFilterBottomSheet>
				{!currentFilter &&
					["calendar", "district", "category"].map((filter) => (
						<Filter
							key={filter}
							type={filter}
							filterTypeData={filterData[filter]}
							setCurrentFilter={setCurrentFilter}
							text={generateSelectedCreteriasText(filter)}
						/>
					))}

				{currentFilter === "calendar" && (
					<Calendar
						selectedRange={selectedRange}
						setSelectedRange={setSelectedRange}
					/>
				)}

				{currentFilter === "district" && (
					<DistrictSelector
						selectedDists={selectedDists}
						setSelectedDists={setSelectedDists}
					/>
				)}
				{currentFilter === "category" && (
					<Categories categories={categories} setCategories={setCategories} />
				)}
			</StyledFilterBottomSheet>
		</BottomSheet>
	);
};

export default FilterBottomSheet;
