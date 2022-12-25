import type { PeopleType } from "../../shared/types";
import type { Dispatch, SetStateAction } from "react";

export type SearchModalProps = {
	type: "calendar" | "districtSelector";
	setCalendarOpen: Dispatch<SetStateAction<boolean>>;
	setDisctrictSelectorOpen: Dispatch<SetStateAction<boolean>>;
};

export type DistrictType = {
	name: string;
	code: string;
	selected: boolean;
};

export type DivisionType = {
	code: string;
	name: string;
	selected: boolean;
	districts: DistrictType[];
};

export type SelectedDistrictType = {
	code: string;
	name: string;
};

export type CategoryDataType = {
	code: string;
	name: string;
	selected: boolean;
};

export type AutoCompleteDataType = {
	text: string;
} & PeopleType;

export type FilterBottomSheetProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export type FiltersType = {
	[key: string]: {
		icon: string;
		name: string;
	};
};

export type CategoryType = "A" | "B" | "C" | "D" | "E";

export type TempSearchFiltersType = {
	date: {
		startDate: Date | null;
		endDate: Date | null;
	};
	districts: DistrictType[];
	categories: CategoryDataType[];
};

export default {};
