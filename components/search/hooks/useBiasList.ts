import { useQuery } from "react-query";
import { fetchPeople } from "../../../shared/apis/common";
import { getBirthMonth } from "../../../shared/utils";
import type { PeopleType, SearchSortOptionKeys } from "../../../shared/types";

type Props = {
	selectedOption: SearchSortOptionKeys;
	selectedMonth: number | null;
};

const useBiasList = ({ selectedOption, selectedMonth }: Props) => {
	const { data: biasList, isLoading } = useQuery(
		["SEARCH/BIAS_LIST", selectedOption],
		fetchPeople,
		{
			select: (data) => {
				let biases = data?.filter(
					(item: PeopleType) => getBirthMonth(item.birthday) === selectedMonth
				);

				switch (selectedOption) {
					case "birthdayAsc":
						biases = biases?.sort(
							(a, b) => a.birthday.slice(-4) - b.birthday.slice(-4)
						);
						break;

					case "birthdayDsc":
						biases = biases?.sort(
							(a, b) => b.birthday.slice(-4) - a.birthday.slice(-4)
						);
						break;

					case "alphabetAsc":
					default:
						break;
				}
				return biases;
			},
		}
	);

	return { biasList, isLoading };
};

export default useBiasList;
