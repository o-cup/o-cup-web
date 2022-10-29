import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { fetchPeople } from "../../shared/apis/common";
import {
	BiasProfile,
	Layout,
	Loading,
	SortIcon,
} from "../../shared/components";
import { searchFiltersAtom, showResultAtom } from "../../shared/state";
import { getBirthMonth } from "../../shared/utils";
import { setMetaTags } from "../../shared/utils/metaTags";
import MonthSelector from "./MonthSelector";
import Result from "./Result";
import SearchInput from "./SearchInput";
import useSetMetaTags from "./hooks/useSetMetaTags";
import { StyledFilter, StyledSearch } from "./styles/searchStyle";
import type { SearchSortOptionKeys } from "../../shared/types";

const Search = () => {
	const router = useRouter();
	const { pathname } = router;
	const [searchFilters, setSearchFilters] = useRecoilState(searchFiltersAtom);
	const { keyword } = searchFilters;
	const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
	const [searchSortOpen, setSearchSortOpen] = useState(false);
	const [selectedBiasId, setSelectedBiasId] = useState<number | null>(null);
	const [selectedOption, setSelectedOption] =
		useState<SearchSortOptionKeys>("alphabetAsc");
	const [showResult, setShowResult] = useRecoilState(showResultAtom);
	const [isMounted, setIsMounted] = useState(false);

	// useSetMetaTags();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const { data: people, isLoading } = useQuery(
		["people", selectedOption],
		() => fetchPeople(selectedOption),
		{
			select: (data) => {
				let biases = data?.filter(
					(item) => getBirthMonth(item.birthday) === selectedMonth
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
			enabled: !showResult && !keyword,
		}
	);

	useEffect(() => {
		setShowResult(!!keyword);

		if (!keyword) {
			router.replace(pathname, undefined, { shallow: true });
		} else {
			router.push({
				pathname,
				query: { keyword },
			});
		}
	}, [keyword]);

	useEffect(() => {
		const today = new Date();
		setSelectedMonth(today.getMonth() + 1);
	}, []);

	const handleBiasClick = ({ name, id }: { name: string; id: number }) => {
		setSearchFilters((prev) => ({ ...prev, keyword: name }));
		setSelectedBiasId(id);
		setShowResult(true);
	};

	const handleBackClick = () => {
		if (showResult) {
			setSearchFilters((prev) => ({ ...prev, keyword: "" }));
			setShowResult(false);
			return;
		}
		router.push("/");
	};

	// Hydration Error Handling
	if (!isMounted) return null;
	if (typeof window === "undefined") return null;

	if (isLoading) {
		return <Loading />;
	}

	const conditionalRender = () => {
		if (showResult) {
			return <Result biasId={selectedBiasId} />;
		}
		return (
			<StyledFilter>
				<div className="months">
					<MonthSelector
						selectedMonth={selectedMonth}
						setSelectedMonth={setSelectedMonth}
					/>
					<SortIcon
						type="search"
						isOpened={searchSortOpen}
						setIsOpened={setSearchSortOpen}
						setSelectedSearchOption={setSelectedOption}
						selectedOption={selectedOption}
					/>
				</div>

				<ul className="biases">
					{people?.map((bias) => (
						<BiasProfile
							key={bias.name}
							biasName={bias.name}
							imgUrl={bias.profilePic}
							handleClick={() =>
								handleBiasClick({ name: bias.name, id: bias.id })
							}
							id={bias.id}
						/>
					))}
				</ul>
			</StyledFilter>
		);
	};

	return (
		<Layout page="search" handleBackClick={handleBackClick} share>
			<StyledSearch>
				<div className="input">
					<SearchInput setSelectedBiasId={setSelectedBiasId} />
				</div>

				{conditionalRender()}
			</StyledSearch>
		</Layout>
	);
};

export default Search;
