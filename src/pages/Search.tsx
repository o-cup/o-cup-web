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
	const viewResult = keyword && searched;

	useEffect(() => {
		const today = new Date();
		setSelectedMonth(today.getMonth() + 1);
	}, []);

	const { data: people } = useQuery(["people"], () => fetchPeople(), {
		select: (data) => data?.filter((item) => getBirthMonth(item.birthday) === selectedMonth),
	});

	const conditionalRender = () => {
		if (viewResult) {
			return <Result keyword={keyword} />;
		}

		return (
			<StyledFilter>
				<div className="months">
					<MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
					<SortIcon options={sortOptions} />
				</div>

				<ul className="biases">
					{people?.map((bias) => (
						<BiasProfile key={bias.name} biasName={bias.name} imgUrl={bias.profilePic} />
					))}
				</ul>
			</StyledFilter>
		);
	};

	return (
		<Layout page="search" share={!!viewResult}>
			<StyledSearch>
				<div className="input">
					<SearchInput keyword={keyword} setKeyword={setKeyword} setSearched={setSearched} />
				</div>

				{conditionalRender()}
			</StyledSearch>
		</Layout>
	);
};

export default Search;
