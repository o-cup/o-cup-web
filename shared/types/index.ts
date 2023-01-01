import type { Dispatch, SetStateAction } from "react";
import type { css } from "styled-components";

export type RequestBias = {
	id?: number;
	peopleId: number;
	bias: string;
	team: string;
};

export type FirstComeDataType = {
	key?: string;
	day?: number;
	items: string[];
};

export type FirstComeType = {
	type: "A" | "B" | "C";
	data: FirstComeDataType[];
};

export type ExtraGoodsType = {
	index: number;
	title: string;
	items: string[];
};

export type GoodsListType = {
	all?: string[];
	random?: string[];
	dDay?: string[];
	firstCome?: FirstComeType;
	lucky?: string[];
	extra?: ExtraGoodsType[];
};

export type EventType = {
	id: string;
	createdAt: string;
	place: string;
	biasesId: number[];
	organizer: string;
	snsId: string;
	districts: { code: string; name: string };
	startAt: string;
	endAt: string;
	images?: string[];
	image?: string;
	address: string;
	goods: GoodsListType;
	hashTags: string[];
	tweetUrl: string;
	category: "A" | "B" | "C" | "D" | "E";
	views: number;
	requestedBiases?: RequestBias[];
	isRequested: boolean;
	isApproved: boolean;
};

export type PeopleType = {
	id: number;
	createdAt: string;
	name: string;
	team?: string[];
	birthday: string;
	profilePic: string;
	koName?: string;
	enName?: string;
	realName?: string;
};

export type FetchEventParams = {
	pageParam?: number;
	infinite?: boolean;
	keyword?: string;
	date?: string;
};

export type CustomStyleType = ReturnType<typeof css> | React.CSSProperties;

export type ColorsType = "white" | "black" | "gray" | "primary";

export type DateRangeType = {
	startDate: Date;
	endDate: Date;
	key: string;
};

export type SearchSortOptionKeys =
	| "alphabetAsc"
	| "birthdayAsc"
	| "birthdayDsc";
export type ResultSortOptionKeys = "dateAsc" | "dateDsc" | "alphabetAsc";

export type SearchInputOptionKey = "bias" | "place";

export type SearchInputOptionType = {
	key: SearchInputOptionKey;
	value: string;
	selected: boolean;
};

export type SearchModalProps = {
	type: "calendar" | "districtSelector";
	setCalendarOpen: Dispatch<SetStateAction<boolean>>;
	setDisctrictSelectorOpen: Dispatch<SetStateAction<boolean>>;
};

export default {};
