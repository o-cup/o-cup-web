type generateOgDescriptionProps = {
	type: "bias" | "place" | "organizer";
	keyword: string;
};

export const generateMetaDescription = ({
	type,
	keyword,
}: generateOgDescriptionProps) => {
	let text = "";

	switch (type) {
		case "bias":
			text = `${keyword || "응원하는 아티스트"}의 생일 이벤트를 검색해보세요!`;
			break;

		case "place":
			text = `${keyword}에서 열리는 생일 이벤트를 검색해보세요!`;
			break;

		case "organizer":
			text = `${keyword}가 주최하는 생일 이벤트를 검색해보세요!`;
			break;

		default:
			break;
	}
	return text;
};

export default {};
