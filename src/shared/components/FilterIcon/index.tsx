import React, { useState } from "react";
import Icon from "../Icon/Icons";
import { StyledFilterIcon } from "./filterIconStyle";

const FilterIcon = () => {
	const [isOpened, setIsOpened] = useState(false);

	return (
		<StyledFilterIcon onClick={() => setIsOpened(!isOpened)} className="sort">
			<Icon name="filter" />
		</StyledFilterIcon>
	);
};

export default FilterIcon;
