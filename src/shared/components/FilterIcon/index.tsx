import React, { Dispatch, SetStateAction } from "react";
import Icon from "../Icon/Icons";
import { StyledFilterIcon } from "./filterIconStyle";

type FilterIconProps = {
	isOpened: boolean;
	setIsOpened: Dispatch<SetStateAction<boolean>>;
	setCalendarOpen: Dispatch<SetStateAction<boolean>>;
};

const FilterIcon = ({ isOpened, setIsOpened, setCalendarOpen }: FilterIconProps) => (
	<StyledFilterIcon onClick={() => setIsOpened(true)} className="sort">
		<Icon name="filter" />
		{isOpened && (
			<ul>
				<li role="presentation" onClick={() => setCalendarOpen(true)}>
					날짜 선택
				</li>
				<li>지역 선택</li>
			</ul>
		)}
	</StyledFilterIcon>
);

export default FilterIcon;
