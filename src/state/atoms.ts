import { atom } from "recoil";
import { convertDateToString } from "../shared/utils/dateHandlers";
import { sessionAtom } from "./recoilUtils";

export const savedPageAtom = atom<number | null>({
  key: "savedPageAtom",
  default: null,
  effects: [sessionAtom],
});

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

export const requestPlaceAtom = atom<{ place: string, district: string, address: string }>({
  key: "requestPlaceAtom",
  default: { place: "", district: "", address: "" },
  effects: [sessionAtom],
});

export const requestArtistsAtom = atom<{ id: number, peopleId: number, bias: string, team: string }[]>({
  key: "requestArtistsAtom",
  default: [
    {
      id: 1,
      peopleId: 0,
      bias: "",
      team: "",
    },
  ],
  effects: [sessionAtom],
});

export const requestBasicAtom = atom<{ organizer: string, snsId: string, link: string }>({
  key: "requestBasicAtom",
  default: { organizer: "", snsId: "", link: "" },
  effects: [sessionAtom],
});

export const requestPosterUrlsAtom = atom<string[]>({
  key: "requestPosterUrlsAtom",
  default: [] as string[],
  effects: [sessionAtom],
});

export const requestHashTagsAtom = atom<{ id: number, text: string }[]>({
  key: "requestHashTagsAtom",
  default: [
    { id: 1, text: "" },
  ],
  effects: [sessionAtom],
});

export const requestDateRangeAtom = atom<{ startAt: string, endAt: string }>({
  key: "requestDateRangeAtom",
  default: { startAt: "", endAt: "" },
  effects: [sessionAtom],
});

export const requestGoodsListAtom = atom<{ id: number, title: string, items: { id: number, text: string }[] }[]>({
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
