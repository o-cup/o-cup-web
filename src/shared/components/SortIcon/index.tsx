import React, { Dispatch, SetStateAction } from "react";
import Icon from "../Icon/Icons";
import StyledSortIcon from "./sortIconStyle";

type SortProps = {
	options: Record<string, string>;
	isOpened: boolean;
	setIsOpened: Dispatch<SetStateAction<boolean>>;
};

const SortIcon = ({ options, isOpened, setIsOpened }: SortProps) => {
	const optionKeys = Object.keys(options) as Array<keyof SortProps["options"]>;

	return (
		<StyledSortIcon onClick={() => setIsOpened(!isOpened)} className="sort">
			<Icon name="sort" />
			{isOpened && (
				<ul>
					{optionKeys.map((option) => (
						<li key={option}>{options[option]}</li>
					))}
				</ul>
			)}
		</StyledSortIcon>
	);
};

export default SortIcon;
