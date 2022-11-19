import { useQuery } from "react-query";
import { fetchPeople } from "../../../shared/apis/common";
import { fetchPlaceData } from "../../../shared/apis/search";
import { removeSpace } from "../../../shared/utils";

type useAutoCompleteProps = {
	searchType: string;
	keyword: string;
	enabled: boolean;
};

const useAutoComplete = ({
	searchType = "bias",
	keyword,
	enabled,
}: useAutoCompleteProps) => {
	const { data: biasData } = useQuery(
		["biases", keyword, searchType],
		() => fetchPeople(),
		{
			enabled: !!keyword && searchType === "bias",
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			select: (data) => {
				const filteredByKeyword = data?.filter((bd) => {
					if (
						bd.name.includes(keyword) ||
						bd.enName?.includes(keyword) ||
						bd.koName?.includes(keyword) ||
						bd.realName?.includes(keyword)
					) {
						return true;
					}
					return false;
				});

				const result = filteredByKeyword
					?.filter((_, i) => i < 5)
					.map((bd) => {
						const teamText = bd.team ? bd.team.join(", ") : "";
						return {
							...bd,
							text: teamText ? `${bd.name} (${teamText})` : bd.name,
						};
					});

				return result;
			},
		}
	);

	const { data: placeData } = useQuery(
		["placeData", searchType, keyword],
		fetchPlaceData,
		{
			enabled: !!keyword && searchType === "place",
			select: (data) => {
				const filtered = data?.filter((placeName, i) =>
					removeSpace(placeName).includes(removeSpace(keyword))
				);

				const set = new Set(filtered);
				const placeNames = Array.from(set);
				return placeNames.filter((_, i) => i < 5);
			},
		}
	);

	if (!enabled) return [];

	return biasData || placeData || [];
};

export default useAutoComplete;
