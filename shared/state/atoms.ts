import { atom } from "recoil";
import { convertDateToString } from "../utils";
import { sessionAtom } from "./recoilUtils";
import type { RegCodeItem, SearchInputOptionType } from "../types";
import type { RequestGoodsListType, RequestType } from "../types/request";

const today = new Date();

export const dateFilterAtom = atom({
	key: "dateFilterAtom",
	default: convertDateToString(today),
});

export const openedBiasAtom = atom({
	key: "openedBiasAtom",
	default: [] as number[],
});

export const tempPostersAtom = atom<
	{ id: number; file: any; result: string }[]
>({
	key: "tempPostersAtom",
	default: [{ id: 1, file: null, result: "" }],
});

export const requestInputsAtom = atom<RequestType>({
	key: "requestInputsAtom",
	default: {
		place: { place: "", address: "", districts: { code: "", name: "" } },
		category: "",
		artist: [{ id: 1, peopleId: 0, bias: "", team: "" }],
		organizer: "",
		snsId: "",
		link: "",
		posterUrls: [{ id: 1, publicUrl: "" }],
		hashTags: [{ id: 1, text: "" }],
		dateRange: { startAt: "", endAt: "" },
		goods: {},
	},
	effects: [sessionAtom],
});

export const requestGoodsListAtom = atom<RequestGoodsListType[]>({
	key: "requestGoodsListAtom",
	default: [
		{
			id: 1,
			key: "",
			title: "",
			items: [{ id: 1, text: "" }],
		},
	],
	effects: [sessionAtom],
});

export type SearchFiltersAtomType = {
	searchType: string;
	placeName: string;
	bid: number | null;
	date: {
		startDate: string;
		endDate: string;
	};
	districts: RegCodeItem[];
};

export const searchFiltersAtom = atom<SearchFiltersAtomType>({
	key: "searchFilters",
	default: {
		searchType: "bias",
		placeName: "",
		bid: null,
		date: {
			startDate: "",
			endDate: "",
		},
		districts: [],
	},
	effects: [sessionAtom],
});

export const showResultAtom = atom<boolean>({
	key: "showResultAtom",
	default: false,
	effects: [sessionAtom],
});

export const searchInputOptionsAtom = atom<SearchInputOptionType[]>({
	key: "searchInputOptionsAtom",
	default: [
		{ key: "bias", value: "아티스트", selected: true },
		{ key: "place", value: "장소이름", selected: false },
	],
});

export default {};
