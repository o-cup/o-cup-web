import React, { Dispatch, SetStateAction } from "react";
import { ResultSortOptionKeys, SearchSortOptionKeys } from "../../../types";
import Icon from "../Icon/Icons";
import { StyledSortIcon, SortOption } from "./sortIconStyle";

type SortProps = {
	type: "result" | "search";
	isOpened: boolean;
	setIsOpened: Dispatch<SetStateAction<boolean>>;
	setSelectedSearchOption?: Dispatch<SetStateAction<SearchSortOptionKeys>>;
	setSelectedResultOption?: Dispatch<SetStateAction<ResultSortOptionKeys>>;
	selectedOption: SearchSortOptionKeys | ResultSortOptionKeys;
};

const options = {
	search: {
		alphabetAsc: "가나다순",
		birthdayAsc: "생일: 1일부터",
		birthdayDsc: "생일: 말일부터",
	},
	result: {
		dateAsc: "날짜: 빠른 순",
		dateDsc: "날짜: 느린 순",
		alphabetAsc: "카페: 가나다순",
	},
};

const SortIcon = ({
	type,
	isOpened,
	setIsOpened,
	setSelectedSearchOption,
	setSelectedResultOption,
	selectedOption,
}: SortProps) => {
	const renderSortOptions = () => {
		if (!isOpened) return null;

		// console.log("selectedOption", selectedOption);

		const resultOptionsKeys = Object.keys(options.result) as Array<ResultSortOptionKeys>;
		const searchOptionKeys = Object.keys(options.search) as Array<SearchSortOptionKeys>;

		switch (type) {
			case "search":
				return (
					<ul>
						{searchOptionKeys.map((option) => (
							<SortOption
								key={option}
								role="presentation"
								onClick={() => setSelectedSearchOption && setSelectedSearchOption(option)}
								isActive={option === selectedOption}
							>
								{options.search[option]}
							</SortOption>
						))}
					</ul>
				);
			case "result":
				return (
					<ul>
						{resultOptionsKeys.map((option) => (
							<SortOption
								key={option}
								role="presentation"
								onClick={() => setSelectedResultOption && setSelectedResultOption(option)}
								isActive={option === selectedOption}
							>
								{options.result[option]}
							</SortOption>
						))}
					</ul>
				);
				break;
			default:
				return null;
				break;
		}
	};

	return (
		<StyledSortIcon onClick={() => setIsOpened(!isOpened)} className="sort">
			<Icon name="sort" />
			{renderSortOptions()}
		</StyledSortIcon>
	);
};

SortIcon.defaultProps = {
	setSelectedSearchOption: "alphabetAsc",
	setSelectedResultOption: "dateAsc",
};

export default SortIcon;
