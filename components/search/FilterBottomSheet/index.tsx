import React, { useState } from "react";
import { BottomSheet, Calendar, Icon } from "../../../shared/components";
import DistrictSelector from "../DistrictSelector";
import { ResetButton } from "../styles/searchStyle";
import Filter from "./Filter";
import { StyledCustomHeader, StyledFilterBottomSheet } from "./style";
import type { DateRangeType, RegCodeItem } from "../../../shared/types";
import type { SetStateAction, Dispatch } from "react";

type FilterBottomSheetProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};

type FiltersType = {
	[key: string]: {
		icon: string;
		name: string;
		status: string;
	};
};

const filterData = {
	calendar: {
		icon: "calendar",
		name: "날짜",
		status: "미선택",
	},
	district: {
		icon: "place",
		name: "지역",
		status: "미선택",
	},
	category: {
		icon: "category",
		name: "이벤트 종류",
		status: "미선택",
	},
} as FiltersType;

const FilterBottomSheet = ({ isOpen, setIsOpen }: FilterBottomSheetProps) => {
	const [selectedRange, setSelectedRange] = useState<DateRangeType>({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});
	const [selectedDists, setSelectedDists] = useState<RegCodeItem[]>([]);

	const [currentFilter, setCurrentFilter] = useState<string | null>(null);

	const handleSelectRange = ({ selection }: { selection: DateRangeType }) => {
		setSelectedRange(selection);
	};

	const headerElements = (
		<StyledCustomHeader>
			<Icon name="arrow-left" handleClick={() => setCurrentFilter(null)} />
			<h2>{currentFilter ? filterData[currentFilter].name : "필터"}</h2>
			<ResetButton onClick={() => console.log("초기화")} className="reset">
				<Icon name="reset" />
				<span>초기화</span>
			</ResetButton>
		</StyledCustomHeader>
	);

	const handleOkClick = () => {
		console.log("ok");
	};

	const buttonElements = (
		<div className="buttons">
			<button type="button" onClick={() => setIsOpen(false)} className="close">
				닫기
			</button>
			<button type="button" onClick={handleOkClick}>
				적용하기
			</button>
		</div>
	);

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
							data={filterData[filter]}
							setCurrentFilter={setCurrentFilter}
						/>
					))}

				{currentFilter === "calendar" && (
					<Calendar
						selectedRange={selectedRange}
						setSelectedRange={setSelectedRange}
						handleSelectRange={handleSelectRange}
						// handleClickSubmit={() => handleSubmit({ modal: "dateRange" })}
						// setCalendarOpen={setCalendarOpen}
					/>
				)}

				{currentFilter === "district" && (
					<DistrictSelector
						selectedDists={selectedDists}
						setSelectedDists={setSelectedDists}
						// handleSubmit={() => handleSubmit({ modal: "district" })}
						// setDisctrictSelectorOpen={setDisctrictSelectorOpen}
					/>
				)}
			</StyledFilterBottomSheet>
		</BottomSheet>
	);
};

export default FilterBottomSheet;
