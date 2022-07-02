import React from "react";
import { BiMap } from "react-icons/bi";
import { StyledFilter } from "../../styles/filterStyle";
import BiasList from "./BiasList";
import SearchInput from "./SearchInput";

function Filter() {

	return (
		<StyledFilter>
			<BiasList />
			<div className="search_container">
				<SearchInput />
				<button type="button">
					<BiMap />
				</button>
			</div>
		</StyledFilter>
	)
}

export default Filter;
