import { useQuery } from "react-query";
import { fetchPeople } from "../../../shared/apis/common";

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
	const { data: biasData } = useQuery("biases", () => fetchPeople(), {
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
	});

	if (!enabled) return [];

	return biasData || [];
};

export default useAutoComplete;
