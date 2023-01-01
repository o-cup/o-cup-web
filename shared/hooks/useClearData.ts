import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { initialCategoryData } from "../constants";
import { searchFiltersAtom, showResultAtom } from "../state/atoms";

const useClearData = () => {
	const setSearchFilters = useSetRecoilState(searchFiltersAtom);
	const setShowResult = useSetRecoilState(showResultAtom);

	useEffect(() => {
		setSearchFilters((prev) => ({
			...prev,
			searchType: "bias",
			bid: null,
			biasName: "",
			placeName: "",
			districts: [],
			categories: initialCategoryData,
		}));
		setShowResult(false);
	}, [setSearchFilters, setShowResult]);
};

export default useClearData;
