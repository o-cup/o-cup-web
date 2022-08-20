import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchPeople } from "../apis";
import MonthSelector from "../components/search/MonthSelector";
import SearchInput from "../components/search/SearchInput";
import { StyledSearch } from "../components/search/styles/searchStyle";
import BiasProfile from "../shared/components/BiasProfile";
import Layout from "../shared/components/layout";
import Sort from "../shared/components/Sort";
import { getBirthMonth } from "../shared/utils/dateHandlers";

const sortOptions = {
	alphabetAsc: "가나다순",
	birthdayAsc: "생일: 1일부터",
	birthdayDsc: "생일: 말일부터",
};

const Search = () => {
	const [keyword, setKeyword] = useState("");
	const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

	useEffect(() => {
		const today = new Date();
		setSelectedMonth(today.getMonth() + 1);
	}, []);

	const { data: people } = useQuery(["people"], () => fetchPeople(), {
		select: (data) => data?.filter((item) => getBirthMonth(item.birthday) === selectedMonth),
	});

	return (
		<Layout page="search">
			<StyledSearch>
				<div className="input">
					<SearchInput keyword={keyword} setKeyword={setKeyword} />
				</div>
				<div className="filter">
					<MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
					<Sort options={sortOptions} />
				</div>

				{/* todo: 스크린 크기 별 정렬 확인  */}
				<ul className="biases">
					{people?.map((bias) => (
						<BiasProfile key={bias.name} biasName={bias.name} imgUrl={bias.profilePic} />
					))}
				</ul>
			</StyledSearch>
		</Layout>
	);
};

export default Search;
