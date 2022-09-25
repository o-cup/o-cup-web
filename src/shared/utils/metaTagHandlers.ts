export const setMetaTags = ({
	title = "오늘의 컵홀더",
	description = "응원하는 아티스트의 생일 이벤트를 한눈에 확인해보세요!",
}: {
	title?: string;
	description?: string;
}) => {
	// set title
	document.title = title;
	document?.querySelector("meta[property='og:title']")?.setAttribute("content", `${title}`);
	document?.querySelector("meta[name='twitter:title']")?.setAttribute("content", `${title}`);

	// set description
	document?.querySelector("meta[property='og:description']")?.setAttribute("content", description);
	document?.querySelector("meta[name='twitter:description']")?.setAttribute("content", description);

	// set images
	document?.querySelector("meta[property='og:image']")?.setAttribute("content", "%PUBLIC_URL%/images/logo_primary.png");
	document
		?.querySelector("meta[name='twitter:image']")
		?.setAttribute("content", "%PUBLIC_URL%/images/logo_primary.png");

	// set url
	document?.querySelector("meta[property='og:url']")?.setAttribute("content", window.location.href);
};

export default {};
