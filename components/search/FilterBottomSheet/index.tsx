import { format } from "date-fns";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { BottomSheet, Calendar, Icon } from "../../../shared/components";
import { initialCategoryData } from "../../../shared/constants";
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
	CategoryDataType,
	DistrictType,
	FilterBottomSheetProps,
	FiltersType,
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

const FilterBottomSheet = ({
	isOpen,
	setIsOpen,
	tempSearchFilters,
	setTempSearchFilters,
}: FilterBottomSheetProps) => {
	const [currentFilter, setCurrentFilter] = useState<string | null>(null);
	const [selectedRange, setSelectedRange] = useState<DateRangeType>({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});
	const [selectedDists, setSelectedDists] = useState<DistrictType[]>([]);
	const [selectedCategories, setSelectedCategories] =
		useState<CategoryDataType[]>(initialCategoryData);
	const setSearchFilters = useSetRecoilState(searchFiltersAtom);

	const handleResetClick = () => {
		if (!currentFilter) {
			setTempSearchFilters((prev) => ({
				...prev,
				date: {
					startDate: null,
					endDate: null,
				},
				districts: [],
				categories: initialCategoryData,
			}));

			setSelectedRange((prev) => ({
				...prev,
				startDate: new Date(),
				endDate: new Date(),
			}));

			setSelectedDists([]);
			setSelectedCategories(initialCategoryData);

			return;
		}

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

			case "category":
				setSelectedCategories(initialCategoryData);
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
				categories: tempSearchFilters.categories,
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

			case "category":
				setTempSearchFilters((prev) => ({
					...prev,
					categories: selectedCategories,
				}));
				break;

			default:
				break;
		}
	};

	const handleClickLeftButton = () => {
		if (!currentFilter) {
			setIsOpen(false);
			setTempSearchFilters((prev) => ({
				...prev,
				date: {
					startDate: null,
					endDate: null,
				},
				districts: [],
				categories: initialCategoryData,
			}));

			setSelectedRange((prev) => ({
				...prev,
				startDate: new Date(),
				endDate: new Date(),
			}));

			setSelectedDists([]);
			setSelectedCategories(initialCategoryData);
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

			case "category":
				setSelectedCategories(initialCategoryData);
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

		const tempSelectedCategories = tempSearchFilters.categories.filter(
			(c) => c.selected
		);

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
				text = tempSelectedCategories?.map((c) => c.name).join(", ");
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
							tempSearchFilters={tempSearchFilters}
							setSelectedRange={setSelectedRange}
							setSelectedDists={setSelectedDists}
							setSelectedCategories={setSelectedCategories}
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
					<Categories
						selectedCategories={selectedCategories}
						setSelectedCategories={setSelectedCategories}
					/>
				)}
			</StyledFilterBottomSheet>
		</BottomSheet>
	);
};

export default FilterBottomSheet;
