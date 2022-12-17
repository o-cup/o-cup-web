import React from "react";
import Icon from "../icon";
import { StyledFilterIcon } from "./filterIconStyle";
import type { Dispatch, SetStateAction } from "react";

type FilterIconProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setCalendarOpen: Dispatch<SetStateAction<boolean>>;
	setDistrictSelectorOpen: Dispatch<SetStateAction<boolean>>;
	// bottomSheetOpen: boolean;
	// setBottomSheetOpen: Dispatch<SetStateAction<boolean>>;
};

const FilterIcon = ({
	isOpen,
	setIsOpen,
	setCalendarOpen,
	setDistrictSelectorOpen,
}: FilterIconProps) => (
	<StyledFilterIcon onClick={() => setIsOpen(!isOpen)} className="sort">
		<Icon name="filter" />
		{isOpen && (
			<ul>
				<li role="presentation" onClick={() => setCalendarOpen(true)}>
					날짜 선택
				</li>
				<li role="presentation" onClick={() => setDistrictSelectorOpen(true)}>
					지역 선택
				</li>
			</ul>
		)}
	</StyledFilterIcon>
);

export default FilterIcon;
