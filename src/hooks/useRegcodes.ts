import { useQuery } from "react-query";
import { fetchRegcodes } from "../apis/search";
import { RegCodeItem } from "../components/search/types";

const getDivCode = (code: string) => code.substring(0, 2);

const useRegCodes = (div: RegCodeItem) => {
	const { data: districtData } = useQuery(["district", div.code], () => fetchRegcodes(div.code), {
		enabled: div.code !== "all",
		select: (data) => {
			if (div.code === "all") return [];

			// 대전 API 오류 방어 코드
			const filterd = data.data.regcodes.filter(
				(regCode: RegCodeItem) => getDivCode(regCode.code) === getDivCode(div.code)
			);

			return filterd.map((regCode: RegCodeItem) => {
				const all = !regCode.name.split(" ")[1];
				return {
					code: regCode.code,
					name: all ? "전체" : regCode.name.split(" ")[1],
					selected: all,
				};
			});
		},
	});

	return districtData || [];
};

export default useRegCodes;
