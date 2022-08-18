import React, { useState } from "react";
import MonthSelector from "../components/search/MonthSelector";
import SearchInput from "../components/search/SearchInput";
import { StyledSearch } from "../components/search/styles/searchStyle";
import Icon from "../shared/components/Icon/Icons";
import Layout from "../shared/components/layout";

const Search = () => {
	const [keyword, setKeyword] = useState("");

	return (
		<Layout title="검색하기">
			<StyledSearch>
				<div className="input">
					<SearchInput keyword={keyword} setKeyword={setKeyword} />
				</div>
				<div className="filter">
					<MonthSelector />
					<Icon name="sort" />
				</div>
			</StyledSearch>
		</Layout>
	);
};

export default Search;
