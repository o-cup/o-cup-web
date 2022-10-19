import { DEFAULT_POSTER_URL } from "../constants";
import type React from "react";

export const imageOnErrorHandler = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
	e.currentTarget.src = DEFAULT_POSTER_URL;
	e.currentTarget.className = "error";
};

export default {};
