import { useQuery } from "react-query";
import { fetchRegcodes } from "../apis/search";
import { RegCodeItem } from "../types";

const useRegCodes = ({ div }: { div: RegCodeItem }) => {
	const { data: divisionData } = useQuery("divisions", () => fetchRegcodes(), {
		select: (data) => [{ code: "all", name: "전국" }, ...data.data.regcodes],
	});

	const { data: districtData } = useQuery(["district", div.code], () => fetchRegcodes(div.code), {
		enabled: div.code !== "all",
		select: (data) => {
			if (div.code === "all") return [];

			return data.data.regcodes.map((regCode: RegCodeItem) => {
				const all = !regCode.name.split(" ")[1];
				return {
					code: regCode.code,
					name: all ? "전체" : regCode.name.split(" ")[1],
					selected: all,
				};
			});
		},
	});

	return {
		divisionData,
		districtData: districtData || [],
	};
};

export default useRegCodes;
