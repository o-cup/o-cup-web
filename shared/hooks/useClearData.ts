import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { searchFiltersAtom, showResultAtom } from "../state/atoms";

const useClearData = () => {
	const setSearchFilters = useSetRecoilState(searchFiltersAtom);
	const setShowResult = useSetRecoilState(showResultAtom);

	useEffect(() => {
		setSearchFilters((prev) => ({ ...prev, keyword: "" }));
		setShowResult(false);
	}, [setSearchFilters, setShowResult]);
};

export default useClearData;
