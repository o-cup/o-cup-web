import React, { useState } from "react";
import { BiMap } from "react-icons/bi";
import { StyledFilter } from "../../styles/filterStyle";
import BiasList from "./BiasList";
import DistrictSelector from "./DistrictSelector";
import SearchInput from "./SearchInput";

function Filter() {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(true);
	};

	if (isOpen) {
		return <DistrictSelector />;
	}

	return (
		<StyledFilter>
			<BiasList />
			<div className="search_container">
				<SearchInput />
				<button type="button" onClick={handleClick}>
					<BiMap />
				</button>
			</div>
		</StyledFilter>
	);
}

export default Filter;
