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

const SearchInput = ({ setSelectedBiasId }: SearchInputProps) => {
	const router = useRouter();
	const [searchFilters, setSearchFilters] = useRecoilState(searchFiltersAtom);
	const showResult = useRecoilValue(showResultAtom);
	const { keyword } = searchFilters;
	const [inputValue, setInputValue] = useState("");
	const [toggle, setToggle] = useState(false);
	const [openAutoComplete, setOpenAutoComplete] = useState(false);

	const [selectOptions, setSelectOptions] = useRecoilState<
		SearchInputOptionType[]
	>(searchInputOptionsAtom);

	const selectedOptionKey =
		selectOptions.find((o) => o.selected)?.key || "bias";
	const selectedOptionValue = selectOptions.find((o) => o.selected)?.value;

	const autoCompleteList = useAutoComplete({
		type: selectedOptionKey,
		keyword: inputValue,
	});

	useEffect(() => {
		setOpenAutoComplete(!!autoCompleteList.length);
	}, [autoCompleteList]);

	useEffect(() => {
		setInputValue(keyword);
	}, [keyword]);

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

	console.log("openAutoComplete", openAutoComplete);

	const handleDeleteClick = () => {
		setInputValue("");
		setSearchFilters((prev) => ({
			...prev,
			bid: null,
		}));

		setSelectedBiasId(null);
	};

	const handleOptionClick = (key: string) => {
		const newData = selectOptions.map((o) => ({
			...o,
			selected: key === o.key,
		}));
		setSelectOptions(newData);

		setToggle(false);
	};

	const handleAutoCompleteClick = (biasData: AutoCompleteDataType) => {
		if (!selectedOptionKey) return;

		console.log("-------selectedOptionKey", selectedOptionKey);

		setSearchFilters((prev) => ({
			...prev,
			searchType: selectedOptionKey,
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
				<p>{selectedOptionValue}</p>
				{toggle ? <FaCaretUp /> : <FaCaretDown />}
			</div>
			{toggle && (
				<ul className="category">
					{selectOptions.map((o) => (
						<StyledOption
							key={o.key}
							selected={o.selected}
							onClick={() => handleOptionClick(o.key)}
						>
							{o.value}
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
