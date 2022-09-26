export const setMetaTags = ({
	title = "오늘의 컵홀더",
	description = "응원하는 아티스트의 생일 이벤트를 한눈에 확인해보세요!",
	imageUrl = "https://www.o-cup.kr/images/ocup_profile.jpg",
}: {
	title?: string;
	description?: string;
	imageUrl?: string;
}) => {
	// set title
	document.title = title;
	document?.querySelector("meta[property='og:title']")?.setAttribute("content", title);
	document?.querySelector("meta[name='twitter:title']")?.setAttribute("content", title);

	// set description
	document?.querySelector("meta[property='og:description']")?.setAttribute("content", description);
	document?.querySelector("meta[name='twitter:description']")?.setAttribute("content", description);

	// set images
	document?.querySelector("meta[property='og:image']")?.setAttribute("content", imageUrl);
	document?.querySelector("meta[name='twitter:image']")?.setAttribute("content", imageUrl);

	// set url
	document?.querySelector("meta[property='og:url']")?.setAttribute("content", window.location.href);
	document?.querySelector("meta[name='twitter:site']")?.setAttribute("content", window.location.href);
};

export default {};
