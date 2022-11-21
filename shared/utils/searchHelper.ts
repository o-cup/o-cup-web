import type { PeopleType } from "../types/index";

export const removeSpace = (str: string) => {
	if (!str) return "";
	return str.split(" ").join("");
};

export const getBiasIdByKeyword = ({
	biasesData,
	keyword,
}: {
	biasesData: PeopleType[];
	keyword: string;
}) => {
	const searchedBiasId = biasesData?.filter((row) => {
		const { name, enName, koName, realName } = row;

		if (
			removeSpace(name).toUpperCase().includes(keyword.toUpperCase()) ||
			(enName &&
				removeSpace(enName).toUpperCase().includes(keyword.toUpperCase())) ||
			(koName && koName.includes(keyword)) ||
			(realName && realName.includes(keyword))
		) {
			return true;
		}
		return false;
	});

	const biasId = searchedBiasId?.map((bias) => bias.id);
	return biasId;
};

export default {};
