import type { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
	font: {
		ko: "",
		en: "",
	},
	colors: {
		primary: "#f9f368",
		softPrimary: "rgba(249, 243, 104, 0.5)",
		background: "#fcfbf7",
		white: "#fff",
		black: "#000",
		gray: "#6a6a6a",
		red: "#CF0000",
		eventDay: "#5eff50",
		disabled: "#7a7a7a",
	},
	category: {
		A: {
			// 카페
			primary: "#E3DB0B",
			background: "#F9F368",
		},
		B: {
			// 꽃집
			primary: "#EF865A",
			background: "#FBB090",
		},
		C: {
			// 음식점
			primary: "#84D7AE",
			background: "#BEEAD4",
		},
		D: {
			// 포토부스
			primary: "#8A8FF8",
			background: "#B8BBFA",
		},
		E: {
			// 기타
			primary: "#F773C5",
			background: "#FBB1DF",
		},
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
