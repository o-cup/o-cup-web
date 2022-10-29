import { useRecoilValue } from "recoil";
import { fetchBiasDataByKeyword } from "../../../shared/apis/search";
import { LOGO_URL } from "../../../shared/constants";
import {
	searchFiltersAtom,
	searchInputOptionsAtom,
} from "../../../shared/state/atoms";
import {
	generateSSRMetaTitle,
	generateSSRMetaDescription,
	setMetaTags,
} from "../../../shared/utils/metaTags";

const useSetResultMetaTags = async () => {
	const searchFilters = useRecoilValue(searchFiltersAtom);
	const { keyword } = searchFilters;
	const searchTypes = useRecoilValue(searchInputOptionsAtom);
	const searchType = searchTypes.find((type) => type.selected)?.key;

	let imageUrl = LOGO_URL;

	if (!keyword) {
		setMetaTags({
			title: generateSSRMetaTitle({ page: "search" }),
			description: generateSSRMetaDescription({ page: "search" }),
			imageUrl,
		});

		return;
	}

	const title = `${keyword} | 검색하기`;
	let description = "";
	const biasData = await fetchBiasDataByKeyword(keyword);

	switch (searchType) {
		case "bias":
			description = `${
				keyword || "응원하는 아티스트"
			}의 생일 이벤트를 검색해보세요!`;

			imageUrl = biasData?.profilePic;
			break;

		case "place":
			description = `${keyword}에서 열리는 생일 이벤트를 검색해보세요!`;
			break;

		case "organizer":
			description = `${keyword}가 주최하는 생일 이벤트를 검색해보세요!`;
			break;

		default:
			break;
	}

	setMetaTags({
		title,
		description,
		imageUrl,
	});
};

export default useSetResultMetaTags;
