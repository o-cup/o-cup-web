import { copyToClipboard } from "./copyHandlers";
import {
	convertDateToString,
	convertDateWithDots,
	convertStringToDate,
	isOpenToday,
	getBirthMonth,
	getDatesInRange,
} from "./dateHandlers";
import { imageOnErrorHandler } from "./imageHandlers";

export const removeSpace = (str: string) => str.split(" ").join("");

export {
	copyToClipboard,
	convertDateToString,
	convertDateWithDots,
	convertStringToDate,
	isOpenToday,
	getDatesInRange,
	getBirthMonth,
	imageOnErrorHandler,
};
