import { atom } from "recoil";
import { convertDateToString } from "../shared/dateHandlers";

const today = new Date();

export const dateFilterAtom = atom({
	key: "dateFilterAtom",
	default: convertDateToString(today),
});

export const biasFilterAtom = atom({
	key: "biasFilterAtom",
	default: [] as number[],
});

export const keywordAtom = atom({
	key: "keywordAtom",
	default: "",
});

export default {};
