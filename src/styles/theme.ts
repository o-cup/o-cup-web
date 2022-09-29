import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
	font: {
		ko: "",
		en: "",
	},
	colors: {
		primary: "#f9f368",
		softPrimary: "rgba(249, 243, 104, 0.3)",
		background: "#fcfbf7",
		white: "#fff",
		black: "#000",
		gray: "#6a6a6a",
		red: "#CF0000",
		eventDay: "#5eff50",
	},
	device: {
		mobile: "screen and (max-width: 720px)",
		desktop: "screen and (min-width: 721px)",
	},
	style: {
		shadow: {
			default: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
		},
	},
	widths: {
		layout: "480px",
	},
	heights: {
		header: "60px",
	},
	zIndex: {
		imageCarousel: 9,
		loadingBackground: 9,
		header: 10,
		bottomSheet: 89, // memo: css 파일에 있어서 직접 입력함
		modal: 99,
		toast: 99,
		loadingSpinner: 999,
	},
};

export type ThemeType = { theme: typeof theme };

export default theme;
