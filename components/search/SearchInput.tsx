import { useRouter } from "next/router";
import React, { memo, useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { Icon } from "../../shared/components";
import { searchFiltersAtom, showResultAtom } from "../../shared/state";
import useAutoComplete from "./hooks/useAutoComplete";
import { StyledOption, StyledSearchInput } from "./styles/searchInputStyle";
import type { AutoCompleteDataType } from "./types";
import type { Dispatch, SetStateAction } from "react";

type SearchInputProps = {
	setSelectedBiasId: Dispatch<SetStateAction<null | number>>;
	openAutoComplete: boolean;
	setOpenAutoComplete: Dispatch<SetStateAction<boolean>>;
};

const searchTypeOptions = [
	{ key: "bias", name: "아티스트" },
	{ key: "place", name: "장소이름" },
];

const SearchInput = ({
	setSelectedBiasId,
	openAutoComplete,
	setOpenAutoComplete,
}: SearchInputProps) => {
	const router = useRouter();
	const { pathname } = router;
	const [searchFilters, setSearchFilters] = useRecoilState(searchFiltersAtom);
	const { placeName, keyword, searchType } = searchFilters;
	const [inputValue, setInputValue] = useState("");
	const [toggle, setToggle] = useState(false);
	const [showResult, setShowResult] = useRecoilState(showResultAtom);
	const [autoCompleteEnabled, setAutoCompleteEnabled] = useState(false);

	const searchTypeText =
		searchTypeOptions.find((o) => o.key === searchType)?.name || "아티스트";

	const autoCompleteList = useAutoComplete({
		searchType,
		keyword: inputValue,
		enabled: autoCompleteEnabled,
	});

	useEffect(() => {
		setInputValue(keyword);
	}, [keyword]);

	useEffect(() => {
		setOpenAutoComplete(!!autoCompleteList.length);
	}, [autoCompleteList, showResult]);

	const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;

		setInputValue(value || "");
		setAutoCompleteEnabled(!!value);
		setShowResult(false);
	};

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

		setInputValue(biasData.name);
		setOpenAutoComplete(false);
		setAutoCompleteEnabled(false);
		setShowResult(true);
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
			/>
			{openAutoComplete && !showResult ? (
				<ul className="autoComplete">
					{autoCompleteList.map((row) => (
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
