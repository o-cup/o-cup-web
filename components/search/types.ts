import type { Dispatch, SetStateAction } from "react";

export type SearchModalProps = {
	type: "calendar" | "districtSelector";
	setCalendarOpen: Dispatch<SetStateAction<boolean>>;
	setDisctrictSelectorOpen: Dispatch<SetStateAction<boolean>>;
};

export type RegCodeItem = {
	code: string;
	name: string;
	selected?: boolean;
};

export default {};
