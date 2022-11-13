import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchPeople } from "../../../shared/apis/common";
import type { AutoCompleteDataType } from "../types";

type useAutoCompleteProps = {
	searchType: "bias" | "place";
	keyword: string;
};

const useAutoComplete = ({
	searchType = "bias",
	keyword,
}: useAutoCompleteProps) => {
	const { data: biasesData } = useQuery("biases", () => fetchPeople(), {
		enabled: !!keyword || searchType === "bias",
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
	const [autoCompleteData, setAutoCompleteData] = useState<
		AutoCompleteDataType[] | []
	>([]);

	// type === "bias"
	useEffect(() => {
		if (!keyword) {
			setAutoCompleteData([]);
			return;
		}

		const data = biasesData?.filter((bd) => {
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

		const result = data?.map((bd) => {
			const teamText = bd.team ? bd.team.join(", ") : "";
			return {
				...bd,
				text: teamText ? `${bd.name} (${teamText})` : bd.name,
			};
		});

		if (result?.length) {
			setAutoCompleteData(result);
		}
	}, [keyword]);

	return autoCompleteData;
};

export default useAutoComplete;
