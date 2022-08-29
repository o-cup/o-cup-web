import { atom } from "recoil";
import { convertDateToString } from "../shared/utils/dateHandlers";
import { sessionAtom } from "./recoilUtils";
import { RequestType } from "../components/request/requestType";

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

export const keywordAtom = atom({
	key: "keywordAtom",
	default: "",
});

export const dateRangeAtom = atom<{ startDate: string; endDate: string; }>({
  key: "dateRangeAtom",
  default: {
    startDate: "",
    endDate: "",
  },
});

export const districtAtom = atom<string[]>({
	key: "districtAtom",
	default: [],
});

export const requestInputsAtom = atom<RequestType>({
  key: "requestInputsAtom",
  default: {
    place: { place: "", district: "", address: "" },
    artist: [
      { id: 1, peopleId: 0, bias: "", team: "" },
    ],
    organizer: "",
    snsId: "",
    link: "",
    posterUrls: [
      { id: 1, publicUrl: "" }
    ],
    hashTags: [
      { id: 1, text: "" },
    ],
    dateRange:{ startAt: "", endAt: "" },
    goods: {},
  },
  effects: [sessionAtom],
});

export const requestGoodsListAtom = atom<{ id: number; title: string; items: { id: number; text: string }[] }[]>({
	key: "requestGoodsListAtom",
	default: [
		{
			id: 1,
			title: "",
			items: [{ id: 1, text: "" }],
		},
	],
	effects: [sessionAtom],
});

export default {};
