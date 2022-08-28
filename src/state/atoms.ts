import { atom } from "recoil";
import { convertDateToString } from "../shared/utils/dateHandlers";
import { sessionAtom } from "./recoilUtils";
import {
  ItemsType,
  RequestArtistType,
  RequestBasicType,
  RequestDateRangeType,
  RequestPlaceType,
  RequestPosterType,
} from "../components/request/requestType";

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

export const requestPlaceAtom = atom<RequestPlaceType>({
  key: "requestPlaceAtom",
  default: { place: "", district: "", address: "" },
  effects: [sessionAtom],
});

export const requestArtistsAtom = atom<RequestArtistType[]>({
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

export const requestBasicAtom = atom<RequestBasicType>({
  key: "requestBasicAtom",
  default: { organizer: "", snsId: "", link: "" },
  effects: [sessionAtom],
});

export const requestPosterUrlsAtom = atom<RequestPosterType[]>({
  key: "requestPosterUrlsAtom",
  default: [{ id: 1, publicUrl: "" }],
  effects: [sessionAtom],
});

export const requestHashTagsAtom = atom<ItemsType[]>({
  key: "requestHashTagsAtom",
  default: [
    { id: 1, text: "" },
  ],
  effects: [sessionAtom],
});

export const requestDateRangeAtom = atom<RequestDateRangeType>({
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
