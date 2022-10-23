import React from "react";
import Icon from "../icon";
import { StyledFilterIcon } from "./filterIconStyle";
import type { Dispatch, SetStateAction } from "react";

type FilterIconProps = {
	isOpened: boolean;
	setIsOpened: Dispatch<SetStateAction<boolean>>;
	setCalendarOpen: Dispatch<SetStateAction<boolean>>;
	setDistrictSelectorOpen: Dispatch<SetStateAction<boolean>>;
	setBottomSheetOpen: Dispatch<SetStateAction<boolean>>;
};

// TODO: 컴포넌트 제거
const FilterIcon = ({
	isOpened,
	setIsOpened,
	setCalendarOpen,
	setDistrictSelectorOpen,
	setBottomSheetOpen,
}: FilterIconProps) => (
	// <StyledFilterIcon onClick={() => setIsOpened(!isOpened)} className="sort">
	<StyledFilterIcon onClick={() => setBottomSheetOpen(true)} className="sort">
		<Icon name="filter" />
		{isOpened && (
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
