import React, { Dispatch, memo, SetStateAction, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import Icon from "../../shared/components/Icon/Icons";
import { searchedAtom, searchFiltersAtom, searchInputOptionsAtom } from "../../state";
import { StyledOption, StyledSearchInput } from "./styles/searchInputStyle";
import { SearchInputOptionType } from "../../types";

type SearchInputProps = {
	setSelectedBiasId: Dispatch<SetStateAction<null | number>>;
	searched: boolean;
};

const SearchInput = ({ setSelectedBiasId, searched }: SearchInputProps) => {
	const [searchFilters, setSearchFilters] = useRecoilState(searchFiltersAtom);
	const { keyword } = searchFilters;
	const setSearched = useSetRecoilState(searchedAtom);
	const [inputValue, setInputValue] = useState("");
	const [toggle, setToggle] = useState(false);
	const [selectOptions, setSelectOptions] = useRecoilState<SearchInputOptionType[]>(searchInputOptionsAtom);
	const selectedOptionValue = selectOptions.find((o) => o.selected)?.value;

	useEffect(() => {
		setInputValue(keyword);
	}, [keyword]);

	const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		if (!value) {
			setInputValue("");
		}
		setInputValue(value);
	};

	const showResult = () => {
		setSearchFilters((prev) => ({ ...prev, keyword: inputValue }));
		setSearched(true);
	};

	const handleEnter = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.key !== "Enter") return;
		e.preventDefault();

		showResult();
	};

	const handleDeleteClick = () => {
		setSearchFilters((prev) => ({ ...prev, keyword: "" }));
		setSelectedBiasId(null);
	};

	const handleOptionClick = (key: string) => {
		const newData = selectOptions.map((o) => ({ ...o, selected: key === o.key }));
		setSelectOptions(newData);

		setToggle(false);
	};

	return (
		<StyledSearchInput searched={searched}>
			<div className="select" onClick={() => setToggle(!toggle)} role="presentation">
				<p>{selectedOptionValue}</p>
				{toggle ? <FaCaretUp /> : <FaCaretDown />}
			</div>
			{toggle && (
				<ul>
					{selectOptions.map((o) => (
						<StyledOption key={o.key} selected={o.selected} onClick={() => handleOptionClick(o.key)}>
							{o.value}
						</StyledOption>
					))}
				</ul>
			)}
			<input
				value={inputValue}
				placeholder="검색어를 입력해주세요."
				onChange={handleInputChange}
				onKeyDown={handleEnter}
			/>
			<Icon name="search" handleClick={() => showResult()} />
			{keyword && <Icon name="delete" handleClick={handleDeleteClick} />}
		</StyledSearchInput>
	);
};

export default memo(SearchInput);
