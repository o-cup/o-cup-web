import React from "react";
import { Icon } from "../../../shared/components";
import { StyledFilter } from "./styles/filterBottomSheetStyle";
import type { DateRangeType } from "../../../shared/types";
import type {
	CategoryDataType,
	DistrictType,
	TempSearchFiltersType,
} from "../types";
import type { Dispatch, SetStateAction } from "react";

type FilterProps = {
	type: string | null;
	filterTypeData: any;
	setCurrentFilter: Dispatch<SetStateAction<string | null>>;
	text: string;
	tempSearchFilters: TempSearchFiltersType;
	setSelectedRange: Dispatch<SetStateAction<DateRangeType>>;
	setSelectedDists: Dispatch<SetStateAction<DistrictType[]>>;
	setSelectedCategories: Dispatch<SetStateAction<CategoryDataType[]>>;
};

const Filter = ({
	type,
	filterTypeData,
	setCurrentFilter,
	text,
	tempSearchFilters,
	setSelectedRange,
	setSelectedDists,
	setSelectedCategories,
}: FilterProps) => {
	if (!type) return null;

	const getDiscription = () => {
		let description = "미선택";

		const isAll = text.split(",").length === 5;

		if (type === "category" && isAll) {
			description = isAll ? "전체" : text;
		}

		return text || description;
	};

	const handleClick = () => {
		setCurrentFilter(type);

		const { date, districts, categories } = tempSearchFilters;
		const { startDate, endDate } = date;

		switch (type) {
			case "calendar":
				if (startDate && endDate) {
					setSelectedRange({
						startDate,
						endDate,
						key: "selection",
					});
				}
				break;

			case "district":
				setSelectedDists(districts);
				break;

			case "category":
				setSelectedCategories(categories);
				break;

			default:
				break;
		}
	};

	return (
		<StyledFilter onClick={handleClick}>
			<div className="text">
				<div>
					<Icon name={filterTypeData.icon} />
					<p>{filterTypeData.name}</p>
				</div>
				<small>{getDiscription()}</small>
			</div>
			<div className="icon">
				<Icon name="arrow-right" />
			</div>
		</StyledFilter>
	);
};
export default Filter;
