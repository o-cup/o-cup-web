import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { searchFiltersAtom, showResultAtom } from "../../../shared/state";

const useSetQueryParams = () => {
	const router = useRouter();
	const { query } = router;
	const setShowResult = useSetRecoilState(showResultAtom);
	const setSearchFilters = useSetRecoilState(searchFiltersAtom);

	useEffect(() => {
		if (!query.type) return;

		const searchType = query.type as string;
		const bid = query.bid as string;
		const placeName = query.name as string;

		setSearchFilters((prev) => ({
			...prev,
			searchType,
			bid: searchType === "bias" ? Number(bid) : null,
			placeName: searchType === "place" ? placeName : "",
		}));

		setShowResult(true);
	}, [query]);
};

export default useSetQueryParams;
