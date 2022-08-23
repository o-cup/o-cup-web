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
	device: {
		mobile: "screen and (max-width: 720px)",
		desktop: "screen and (min-width: 721px)",
	},
	style: {
		shadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
	},
	heights: {
		header: "76px",
	},
};

export type ThemeType = { theme: typeof theme };

export default theme;
