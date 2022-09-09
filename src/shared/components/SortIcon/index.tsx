import React, { Dispatch, SetStateAction } from "react";
import { SearchSortOptions } from "../../../types";
import Icon from "../Icon/Icons";
import StyledSortIcon from "./sortIconStyle";

type SortProps = {
	options: Record<string, string>;
	isOpened: boolean;
	setIsOpened: Dispatch<SetStateAction<boolean>>;
	setSelectedOption?: Dispatch<SetStateAction<SearchSortOptions>>;
};

const SortIcon = ({ options, isOpened, setIsOpened, setSelectedOption }: SortProps) => {
	const optionKeys = Object.keys(options) as Array<SearchSortOptions>;

	return (
		<StyledSortIcon onClick={() => setIsOpened(!isOpened)} className="sort">
			<Icon name="sort" />
			{isOpened && (
				<ul>
					{optionKeys.map((option) => (
						<li key={option} role="presentation" onClick={() => setSelectedOption && setSelectedOption(option)}>
							{options[option]}
						</li>
					))}
				</ul>
			)}
		</StyledSortIcon>
	);
};

SortIcon.defaultProps = {
	setSelectedOption: "alphabetAsc",
};

export default SortIcon;
