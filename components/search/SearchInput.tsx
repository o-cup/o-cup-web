import { useRouter } from "next/router";
import React, { memo, useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { Icon } from "../../shared/components";
import {
	searchFiltersAtom,
	searchInputOptionsAtom,
	showResultAtom,
} from "../../shared/state";
import { StyledOption, StyledSearchInput } from "./styles/searchInputStyle";
import type { SearchInputOptionType } from "../../shared/types";
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
	const [selectOptions, setSelectOptions] = useRecoilState<
		SearchInputOptionType[]
	>(searchInputOptionsAtom);
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

	const submitKeyword = () => {
		const { pathname } = router;

		router.push({
			pathname,
			query: { keyword: inputValue },
		});

		setSearchFilters((prev) => ({ ...prev, keyword: inputValue }));
	};

	const handleEnter = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.key !== "Enter") return;
		e.preventDefault();

		submitKeyword();
	};

	const handleDeleteClick = () => {
		setSearchFilters((prev) => ({ ...prev, keyword: "" }));
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
				<ul>
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
				onKeyDown={handleEnter}
			/>
			<Icon name="search" handleClick={() => submitKeyword()} />
			{keyword && <Icon name="delete" handleClick={handleDeleteClick} />}
		</StyledSearchInput>
	);
};

export default memo(SearchInput);
