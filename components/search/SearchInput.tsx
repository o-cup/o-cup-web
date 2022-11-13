import { useRouter } from "next/router";
import React, { memo, useEffect, useRef, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { Icon } from "../../shared/components";
import {
	searchFiltersAtom,
	searchInputOptionsAtom,
	showResultAtom,
} from "../../shared/state";
import useAutoComplete from "./hooks/useAutoComplete";
import { StyledOption, StyledSearchInput } from "./styles/searchInputStyle";
import type { PeopleType, SearchInputOptionType } from "../../shared/types";
import type { AutoCompleteDataType } from "./types";
import type { Dispatch, SetStateAction } from "react";

type SearchInputProps = {
	setSelectedBiasId: Dispatch<SetStateAction<null | number>>;
};

const searchTypeOptions = [
	{ key: "bias", name: "아티스트" },
	{ key: "place", name: "장소이름" },
];

const SearchInput = ({ setSelectedBiasId }: SearchInputProps) => {
	const router = useRouter();
	const { pathname } = router;
	const [searchFilters, setSearchFilters] = useRecoilState(searchFiltersAtom);
	const { placeName, searchType } = searchFilters;
	const [inputValue, setInputValue] = useState("");
	const [toggle, setToggle] = useState(false);
	const [openAutoComplete, setOpenAutoComplete] = useState(false);
	const [showResult, setShowResult] = useRecoilState(showResultAtom);

	const searchTypeText =
		searchTypeOptions.find((o) => o.key === searchType)?.name || "아티스트";

	// const [selectOptions, setSelectOptions] = useRecoilState<
	// 	SearchInputOptionType[]
	// >(searchInputOptionsAtom);

	// const selectedOptionKey =
	// 	selectOptions.find((o) => o.selected)?.key || "bias";
	// const selectedOptionValue = selectOptions.find((o) => o.selected)?.value;

	const autoCompleteList = useAutoComplete({
		searchType: "bias",
		keyword: inputValue,
	});

	useEffect(() => {
		setOpenAutoComplete(!!autoCompleteList.length);
	}, [autoCompleteList]);

	// useEffect(() => {
	// 	setInputValue(keyword);
	// }, [keyword]);

	const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;

		setInputValue(value || "");
	};

	// const submitKeyword = () => {
	// 	const { pathname } = router;

	// 	router.replace({
	// 		pathname,
	// 		query: { keyword: inputValue },
	// 	});

	// 	setSearchFilters((prev) => ({
	// 		...prev,
	// 		keyword: inputValue,
	// 	}));
	// };

	// const handleEnter = (e: React.KeyboardEvent<HTMLElement>) => {
	// 	if (e.key !== "Enter") return;
	// 	e.preventDefault();

	// 	submitKeyword();
	// };

	// console.log("openAutoComplete", openAutoComplete);

	const handleDeleteClick = () => {
		setInputValue("");
		setSearchFilters((prev) => ({
			...prev,
			bid: null,
		}));

		setSelectedBiasId(null);
	};

	const handleOptionClick = (key: string) => {
		setSearchFilters((prev) => ({ ...prev, searchType: key }));
		setToggle(false);
	};

	const handleAutoCompleteClick = (biasData: AutoCompleteDataType) => {
		if (!searchType) return;

		setSearchFilters((prev) => ({
			...prev,
			searchType,
			bid: biasData.id,
		}));

		setOpenAutoComplete(false);
	};

	return (
		<StyledSearchInput showResult={showResult}>
			<div
				className="select"
				onClick={() => setToggle(!toggle)}
				role="presentation"
			>
				<p>{searchTypeText}</p>
				{toggle ? <FaCaretUp /> : <FaCaretDown />}
			</div>
			{toggle && (
				<ul className="category">
					{searchTypeOptions.map((o) => (
						<StyledOption
							key={o.key}
							selected={o.key === searchType}
							onClick={() => handleOptionClick(o.key)}
						>
							{o.name}
						</StyledOption>
					))}
				</ul>
			)}
			<input
				value={inputValue}
				placeholder="검색어를 입력해주세요."
				onChange={handleInputChange}
				// onKeyDown={handleEnter}
			/>
			{openAutoComplete ? (
				<ul className="autoComplete">
					{autoCompleteList.map((row, index) => (
						<li
							key={row.id}
							role="presentation"
							onClick={() => handleAutoCompleteClick(row)}
						>
							<p>{row.text}</p>
							<Icon name="arrow-up-right" />
						</li>
					))}
				</ul>
			) : null}
			{inputValue && <Icon name="delete" handleClick={handleDeleteClick} />}
		</StyledSearchInput>
	);
};

export default memo(SearchInput);
