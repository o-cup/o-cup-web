import { css } from "styled-components";

export type RequestBias = {
	id?: number;
	peopleId: number;
	bias: string;
	team: string;
};

export type EventType = {
	id: number;
	createdAt: string;
	place: string;
	bias: string[];
	biasesId: number[];
	organizer: string;
	snsId: string;
	district: string;
	startAt: string;
	endAt: string;
	images: string[];
	requestedBiases?: RequestBias[];
	isRequested: boolean;
	isApproved: boolean;
};

export type GoodsItemType = {
	title: string;
	items: string[];
	type?: "AND" | "OR";
};

export type DetailType = {
	id: string;
	address: string;
	goods: GoodsItemType[];
	hashTags: string[];
	tweetUrl: string;
};

export type PeopleType = {
	id: number;
	createdAt: string;
	name: string;
	team: string[];
	birthday: string;
	profilePic: string;
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
