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
	requestedBiases?: any[];
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
