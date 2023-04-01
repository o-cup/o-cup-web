import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "../constants";

export const generateSSRMetaTitle = ({
	page,
	keyword,
}: {
	page: string;
	keyword?: string;
}) => {
	let title = DEFAULT_TITLE;

	switch (page) {
		case "detail":
			title = `${DEFAULT_TITLE} | 상세보기`;
			break;

		case "search":
			title = `${keyword || DEFAULT_TITLE} | 검색하기`;
			break;

		case "request":
			title = `${DEFAULT_TITLE} | 이벤트 등록하기`;
			break;

		default:
			break;
	}

	return title;
};

type GenerateMetaDescriptionProps = {
	page: string;
	place?: string;
	names?: string[];
};

export const generateSSRMetaDescription = ({
	page,
	place,
	names,
}: GenerateMetaDescriptionProps) => {
	let description = DEFAULT_DESCRIPTION;
	const nameText = names?.join(", ");

	switch (page) {
		case "detail":
			description = `${place}에서 열리는 ${nameText} 이벤트를 오늘의 컵홀더에서 확인해보세요!`;
			break;

		case "search":
			description = "응원하는 아티스트의 생일 이벤트를 검색해보세요!";
			break;

		case "request":
			description = "응원하는 아티스트의 생일 이벤트를 등록해보세요!";
			break;

		default:
			return description;
	}

	return description;
};

export const setMetaTags = ({
	title,
	description,
	imageUrl,
}: {
	title: string;
	description: string;
	imageUrl: string;
}) => {
	if (typeof window !== "object") return;

	// set title
	document.title = title;
	document
		?.querySelector("meta[property='og:title']")
		?.setAttribute("content", title);
	document
		?.querySelector("meta[name='twitter:title']")
		?.setAttribute("content", title);

	// set description
	document
		?.querySelector("meta[name='description']")
		?.setAttribute("content", description);
	document
		?.querySelector("meta[property='og:description']")
		?.setAttribute("content", description);
	document
		?.querySelector("meta[name='twitter:description']")
		?.setAttribute("content", description);

	// set images
	document
		?.querySelector("meta[property='og:image']")
		?.setAttribute("content", imageUrl);
	document
		?.querySelector("meta[name='twitter:image']")
		?.setAttribute("content", imageUrl);

	// set url
	document
		?.querySelector("meta[property='og:url']")
		?.setAttribute("content", window.location.href);
	document
		?.querySelector("meta[name='twitter:site']")
		?.setAttribute("content", window.location.href);
};

export default {};
