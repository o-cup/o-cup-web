import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { fetchBiasNameById } from "../../../shared/apis/search";
import { searchFiltersAtom, showResultAtom } from "../../../shared/state";

const useSetQueryParams = () => {
	const router = useRouter();
	const { query } = router;
	const searchType = query.type as string;
	const bid = query.bid as string;
	const placeName = query.name as string;
	const setShowResult = useSetRecoilState(showResultAtom);
	const setSearchFilters = useSetRecoilState(searchFiltersAtom);

	const { data: biasName } = useQuery(
		["biasName", bid],
		() => fetchBiasNameById(Number(bid)),
		{
			enabled: !!bid,
		}
	);

	useEffect(() => {
		if (!query.type) return;

		setSearchFilters((prev) => ({
			...prev,
			searchType,
			bid: searchType === "bias" ? Number(bid) : null,
			biasName,
			placeName: searchType === "place" ? placeName : "",
		}));

		setShowResult(true);
	}, [query, biasName]);
};

export default useSetQueryParams;
