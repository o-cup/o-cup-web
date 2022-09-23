import { css } from "styled-components";

export type RequestBias = {
	id?: number;
	peopleId: number;
	bias: string;
	team: string;
};

export type EventType = {
	id: string;
	createdAt: string;
	place: string;
	bias: string[];
	biasesId: number[];
	organizer: string;
	snsId: string;
	district: string;
	newDistrict: { code: string; name: string };
	startAt: string;
	endAt: string;
	images: string[];
	requestedBiases?: RequestBias[];
	isRequested: boolean;
	isApproved: boolean;
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

export type DetailType = {
	id: string;
	address: string;
	goods: GoodsListType;
	hashTags: string[];
	tweetUrl: string;
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

export type SearchSortOptions = "alphabetAsc" | "birthdayAsc" | "birthdayDsc";
export type ResultSortOptions = "dateAsc" | "dateDsc" | "alphabetAsc";
