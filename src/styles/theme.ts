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
		red: "#CF0000",
	},
	device: {
		mobile: "screen and (max-width: 720px)",
		desktop: "screen and (min-width: 721px)",
	},
	style: {
		shadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
	},
	maxWidths: {
		layout: "480px",
	},
	heights: {
		header: "76px",
	},
	zIndex: {
		imageCarousel: 9,
		header: 10,
		bottomSheet: 89, // memo: css 파일에 있어서 직접 입력함
		modal: 99,
	},
};

export type ThemeType = { theme: typeof theme };

export default theme;
