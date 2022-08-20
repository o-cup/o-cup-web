import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchPeople } from "../apis";
import MonthSelector from "../components/search/MonthSelector";
import SearchInput from "../components/search/SearchInput";
import { StyledSearch } from "../components/search/styles/searchStyle";
import BiasProfile from "../shared/components/BiasProfile";
import Icon from "../shared/components/Icon/Icons";
import Layout from "../shared/components/layout";
import Sort from "../shared/components/Sort";
import { getBirthMonth } from "../shared/utils/dateHandlers";

const Search = () => {
	const [keyword, setKeyword] = useState("");
	const [selectedMonth, setSelectedMonth] = useState<number>(8);

	const { data: people } = useQuery(["people"], () => fetchPeople(), {
		select: (data) => data?.filter((item) => getBirthMonth(item.birthday) === selectedMonth),
	});

	return (
		<Layout title="검색하기">
			<StyledSearch>
				<div className="input">
					<SearchInput keyword={keyword} setKeyword={setKeyword} />
				</div>
				<div className="filter">
					<MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
					{/* <Icon name="sort" /> */}
					<Sort />
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
