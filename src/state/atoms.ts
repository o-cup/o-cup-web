import { atom } from "recoil";
import { convertDateToString } from "../shared/utils/dateHandlers";

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
  default: ""
});

export const requestPlaceAtom = atom({
  key: "requestPlaceAtom",
  default: { place: "", district: "", address: "" }
});

export const requestArtistsAtom = atom({
  key: "requestArtistsAtom",
  default: [
    {
      id: 1,
      peopleId: 0,
      bias: "",
      team: ""
    }
  ]
});

export const requestBasicAtom = atom({
  key: "requestBasicAtom",
  default: { organizer: "", snsId: "", link: "" }
});

export const requestPosterUrlsAtom = atom({
  key: "requestPosterUrlsAtom",
  default: [] as string[]
});

export const requestHashTagsAtom = atom({
  key: "requestHashTagsAtom",
  default: [
    { id: 1, text: "" }
  ]
});

export const requestDateRangeAtom = atom({
  key: "requestDateRangeAtom",
  default: { startAt: "", endAt: "" }
});

export const requestGoodsListAtom = atom({
  key: "requestGoodsListAtom",
  default: [
    {
      id: 1,
      title: "",
      items: [{ id: 1, text: "" }],
    },
  ]
});

export default {};
