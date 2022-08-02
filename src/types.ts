export type EventType = {
	id: number;
	createdAt: string;
	place: string;
	bias: string[];
	organizer: string;
	snsId: string;
	district: string;
	startAt: string;
	endAt: string;
	images: string[];
};

export type GoodsItemType = {
	title: string;
	items: string[];
	type: "AND" | "OR";
};

export type DetailType = {
	id: string;
	address: string;
	goods: GoodsItemType[];
	hashTags: string[];
	tweetUrl: string;
};

export type PeopleType = {
	id: string;
	createdAt: string;
	name: string;
	birthday: string;
	profilePic: string;
};
