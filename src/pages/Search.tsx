import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { fetchPeople } from "../apis";
import { MonthSelector, Result, SearchInput } from "../components/search";
import { StyledFilter, StyledSearch } from "../components/search/styles/searchStyle";
import BiasProfile from "../shared/components/BiasProfile";
import Layout from "../shared/components/layout";
import SortIcon from "../shared/components/SortIcon";
import { getBirthMonth } from "../shared/utils/dateHandlers";
import { searchedAtom, searchFiltersAtom } from "../state";
import { SearchSortOptions } from "../types";

const sortOptions = {
	alphabetAsc: "가나다순",
	birthdayAsc: "생일: 1일부터",
	birthdayDsc: "생일: 말일부터",
};

const Search = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchFilters, setSearchFilters] = useRecoilState(searchFiltersAtom);
	const { keyword } = searchFilters;
	const [searched, setSearched] = useRecoilState(searchedAtom);
	const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
	const [searchSortOpen, setSearchSortOpen] = useState(false);
	const [selectedBiasId, setSelectedBiasId] = useState<number | null>(null);
	const [selectedOption, setSelectedOption] = useState<SearchSortOptions>("alphabetAsc");
	const [viewResult, setViewResult] = useState(false);

	const { data: people } = useQuery(["people", selectedOption], () => fetchPeople(selectedOption), {
		select: (data) => {
			let biases = data?.filter((item) => getBirthMonth(item.birthday) === selectedMonth);

			// TODO: people 테이블 birthday 컬럼 수정 후 제거(apis 에서 처리)
			switch (selectedOption) {
				case "birthdayAsc":
					biases = biases?.sort((a, b) => a.birthday.slice(-4) - b.birthday.slice(-4));
					break;

				case "birthdayDsc":
					biases = biases?.sort((a, b) => b.birthday.slice(-4) - a.birthday.slice(-4));
					break;

				case "alphabetAsc":
				default:
					break;
			}
			return biases;
		},
	});

	useEffect(() => {
		setSearchFilters((prev) => ({ ...prev, date: { startDate: "", endDate: "" }, districts: [] }));
	}, [keyword, setSearchFilters]);

	useEffect(() => {
		setViewResult(!!(keyword && searched));

		if (!keyword) {
			setSearched(false);
		}
	}, [keyword, searched, setSearched]);

	useEffect(() => {
		if (!viewResult) return;
		if (keyword) {
			setSearchParams({ keyword });
		}
	}, [viewResult, setSearchParams, keyword, setSearchFilters]);

	useEffect(() => {
		const today = new Date();
		setSelectedMonth(today.getMonth() + 1);
	}, []);

	const handleBiasClick = ({ name, id }: { name: string; id: number }) => {
		setSearchFilters((prev) => ({ ...prev, keyword: name }));
		setSelectedBiasId(id);
		setSearched(true);
	};

	const handleBackClick = () => {
		setSearchFilters((prev) => ({ ...prev, keyword: "" }));
		setSearched(false);
	};

	const conditionalRender = () => {
		if (viewResult) {
			return <Result biasId={selectedBiasId} searchParams={searchParams} />;
		}
		return (
			<StyledFilter>
				<div className="months">
					<MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
					<SortIcon
						options={sortOptions}
						isOpened={searchSortOpen}
						setIsOpened={setSearchSortOpen}
						setSelectedOption={setSelectedOption}
					/>
				</div>

				<ul className="biases">
					{people?.map((bias) => (
						<BiasProfile
							key={bias.name}
							biasName={bias.name}
							imgUrl={bias.profilePic}
							handleClick={() => handleBiasClick({ name: bias.name, id: bias.id })}
							id={bias.id}
						/>
					))}
				</ul>
			</StyledFilter>
		);
	};

	return (
		<Layout page="search" handleBackClick={searched ? handleBackClick : undefined}>
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
