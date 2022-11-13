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

export type CategoriesStateType = Record<string, boolean>;

export default {};
