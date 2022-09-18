import { atom } from "recoil";
import { RequestGoodsListType, RequestType } from "../components/request/requestType";
import { RegCodeItem } from "../components/search/types";
import { convertDateToString } from "../shared/utils/dateHandlers";
import { sessionAtom } from "./recoilUtils";

const today = new Date();

export const dateFilterAtom = atom({
	key: "dateFilterAtom",
	default: convertDateToString(today),
});

export const biasFilterAtom = atom({
	key: "biasFilterAtom",
	default: [] as number[],
});

export const openedBiasAtom = atom({
	key: "openedBiasAtom",
	default: [] as number[],
});

export const requestInputsAtom = atom<RequestType>({
	key: "requestInputsAtom",
	default: {
		place: { place: "", district: "", address: "", newDistrict: { code: "", name: "" } },
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
	keyword: string;
	date: {
		startDate: string;
		endDate: string;
	};
	districts: RegCodeItem[];
};

export const searchFiltersAtom = atom<SearchFiltersAtomType>({
	key: "searchFilters",
	default: {
		keyword: "",
		date: {
			startDate: "",
			endDate: "",
		},
		districts: [],
	},
	effects: [sessionAtom],
});

export const searchedAtom = atom<boolean>({
	key: "searchedAtom",
	default: false,
	effects: [sessionAtom],
});

export default {};
