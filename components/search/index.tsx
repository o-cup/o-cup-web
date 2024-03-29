import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
	BiasProfile,
	Layout,
	Loading,
	SortIcon,
} from "../../shared/components";
import KakaoAdFit from "../../shared/components/kakaoAdFit";
import { initialCategoryData } from "../../shared/constants";
import { searchFiltersAtom, showResultAtom } from "../../shared/state";
import MonthSelector from "./MonthSelector";
import Result from "./Result";
import SearchInput from "./SearchInput";
import useBiasList from "./hooks/useBiasList";
import useHanleDirectAccess from "./hooks/useHandleDirectAccess";
import { StyledFilter, StyledSearch } from "./styles/searchStyle";
import type { SearchSortOptionKeys } from "../../shared/types";

const Search = () => {
	const router = useRouter();
	const { pathname } = router;
	const setSearchFilters = useSetRecoilState(searchFiltersAtom);
	const [showResult, setShowResult] = useRecoilState(showResultAtom);
	const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
	const [searchSortOpen, setSearchSortOpen] = useState(false);
	const [selectedOption, setSelectedOption] =
		useState<SearchSortOptionKeys>("alphabetAsc");
	const [inputValue, setInputValue] = useState("");
	const [openAutoComplete, setOpenAutoComplete] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useHanleDirectAccess();

	const { biasList, isLoading } = useBiasList({
		selectedOption,
		selectedMonth,
	});

	useEffect(() => {
		const today = new Date();
		setSelectedMonth(today.getMonth() + 1);
	}, []);

	const handleBiasClick = ({ name, id }: { name: string; id: number }) => {
		setSearchFilters((prev) => ({
			...prev,
			searchType: "bias",
			bid: id,
			biasName: name,
		}));
		setShowResult(true);
		setOpenAutoComplete(false);

		router.push({
			pathname,
			query: { type: "bias", bid: id },
		});
	};

	const handleBackClick = () => {
		if (showResult) {
			setSearchFilters((prev) => ({
				...prev,
				bid: null,
				biasName: "",
				placeName: "",
				date: {
					startDate: null,
					endDate: null,
				},
				districts: [],
				categories: initialCategoryData,
			}));

			setShowResult(false);
			setInputValue("");
			router.push("/search");
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
			return <Result />;
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
					{biasList?.map((bias: any) => (
						<BiasProfile
							key={bias.id}
							biasName={bias.name}
							imgUrl={bias.profilePic}
							handleClick={() =>
								handleBiasClick({ name: bias.name, id: bias.id })
							}
							id={bias.id}
						/>
					))}
				</ul>
				<KakaoAdFit unitCode="DAN-XIa6eGUHiz3Rkqbq" height="250" />
			</StyledFilter>
		);
	};

	return (
		<Layout page="search" handleBackClick={handleBackClick} share>
			<StyledSearch>
				<div className="input">
					<SearchInput
						openAutoComplete={openAutoComplete}
						setOpenAutoComplete={setOpenAutoComplete}
						inputValue={inputValue}
						setInputValue={setInputValue}
					/>
				</div>
				{conditionalRender()}
			</StyledSearch>
		</Layout>
	);
};

export default Search;
