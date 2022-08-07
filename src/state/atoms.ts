import { atom } from "recoil";
import { convertDateToString } from "../shared/dateHandlers";

const today = new Date();

export const dateFilterState = atom({
	key: "dateFilterState",
	default: convertDateToString(today),
});

export const biasState = atom({
	key: "biasState",
	default: "",
});

export const keywordAtom = atom({
	key: "keywordAtom",
	default: "",
});

export default {};
