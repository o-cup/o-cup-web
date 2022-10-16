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
import { setMetaTags } from "./metaTagHandlers";

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
	setMetaTags,
};