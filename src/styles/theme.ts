import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
	font: {
		ko: "",
		en: "",
	},
	colors: {
		primary: "#f9f368",
		background: "#fcfbf7",
		white: "#fff",
		black: "#000",
		gray: "#7a7a7a",
	},
};

export type ThemeType = { theme: typeof theme };

export default theme;
