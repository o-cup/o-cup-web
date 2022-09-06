import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchPeople } from "../apis";
import { MonthSelector, Result, SearchInput } from "../components/search";
import { StyledFilter, StyledSearch } from "../components/search/styles/searchStyle";
import BiasProfile from "../shared/components/BiasProfile";
import Layout from "../shared/components/layout";
import SortIcon from "../shared/components/SortIcon";
import { getBirthMonth } from "../shared/utils/dateHandlers";

const sortOptions = {
	alphabetAsc: "가나다순",
	birthdayAsc: "생일: 1일부터",
	birthdayDsc: "생일: 말일부터",
};

const Search = () => {
	const [keyword, setKeyword] = useState("");
	const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
	const [searched, setSearched] = useState(false);
	const [searchSortOpen, setSearchSortOpen] = useState(false);
	const [selectedBiasId, setSelectedBiasId] = useState<number | null>(null);
	const viewResult = keyword && searched;

	const { data: people } = useQuery(["people"], fetchPeople, {
		select: (data) => data?.filter((item) => getBirthMonth(item.birthday) === selectedMonth),
	});

	useEffect(() => {
		if (!keyword) {
			setSearched(false);
		}
	}, [keyword, setSearched]);

	useEffect(() => {
		const today = new Date();
		setSelectedMonth(today.getMonth() + 1);
	}, []);

	const handleBiasClick = ({ name, id }: { name: string; id: number }) => {
		setKeyword(name);
		setSelectedBiasId(id);
		setSearched(true);
	};

	const handleBackClick = () => {
		setKeyword("");
		setSearched(false);
	};

	const conditionalRender = () => {
		if (viewResult) {
			return <Result keyword={keyword} biasId={selectedBiasId} />;
		}
		return (
			<StyledFilter>
				<div className="months">
					<MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
					<SortIcon options={sortOptions} isOpened={searchSortOpen} setIsOpened={setSearchSortOpen} />
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
		<Layout page="search" share={!!viewResult} handleBackClick={searched ? handleBackClick : undefined}>
			<StyledSearch>
				<div className="input">
					<SearchInput
						keyword={keyword}
						setKeyword={setKeyword}
						setSearched={setSearched}
						setSelectedBiasId={setSelectedBiasId}
					/>
				</div>

				{conditionalRender()}
			</StyledSearch>
		</Layout>
	);
};

export default Search;
