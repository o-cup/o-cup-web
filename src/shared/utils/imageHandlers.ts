import React from "react";
import { DEFAULT_POSTER_URL } from "../constants";

export const imageOnErrorHandler = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
	e.currentTarget.src = DEFAULT_POSTER_URL;
	e.currentTarget.className = "error";
};

export default {};
