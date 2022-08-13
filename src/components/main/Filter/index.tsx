import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { StyledFilter } from "../../../styles/filterStyle";
import BiasList from "./BiasList";
import CustomBottomSheet from "./BottomSheet/CustomBottomSheet";
import SearchInput from "./SearchInput";

function Filter() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<StyledFilter>
				<BiasList />
				<div className="search_container">
					<SearchInput />
					<button type="button" onClick={() => setOpen(true)}>
						<FaMapMarkerAlt />
					</button>
				</div>
			</StyledFilter>
			{open && <CustomBottomSheet setOpen={setOpen} />}
		</>
	);
}

export default Filter;
