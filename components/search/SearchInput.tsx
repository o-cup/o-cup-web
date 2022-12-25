import { useRouter } from "next/router";
import React, { memo, useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { Icon } from "../../shared/components";
import { searchFiltersAtom, showResultAtom } from "../../shared/state";
import { removeSpace } from "../../shared/utils";
import useAutoComplete from "./hooks/useAutoComplete";
import { StyledOption, StyledSearchInput } from "./styles/searchInputStyle";
import type { AutoCompleteDataType } from "./types";
import type { Dispatch, SetStateAction } from "react";

type SearchInputProps = {
	openAutoComplete: boolean;
	setOpenAutoComplete: Dispatch<SetStateAction<boolean>>;
	inputValue: string;
	setInputValue: Dispatch<SetStateAction<string>>;
};

const searchTypeOptions = [
	{ key: "bias", name: "아티스트" },
	{ key: "place", name: "장소이름" },
];

const SearchInput = ({
	openAutoComplete,
	setOpenAutoComplete,
	inputValue,
	setInputValue,
}: SearchInputProps) => {
	const router = useRouter();
	const { pathname } = router;
	const [searchFilters, setSearchFilters] = useRecoilState(searchFiltersAtom);
	const { biasName, placeName, searchType } = searchFilters;
	const [toggle, setToggle] = useState(false);
	const [showResult, setShowResult] = useRecoilState(showResultAtom);
	const [autoCompleteEnabled, setAutoCompleteEnabled] = useState(false);

	const searchTypeText =
		searchTypeOptions.find((o) => o.key === searchType)?.name || "아티스트";

	const autoCompleteList = useAutoComplete({
		searchType,
		keyword: removeSpace(inputValue) || "",
		enabled: autoCompleteEnabled,
	});

	useEffect(() => {
		if (biasName) {
			setInputValue(biasName);
		}
	}, [biasName]);

	useEffect(() => {
		if (placeName) {
			setInputValue(placeName);
		}
	}, [placeName]);

	useEffect(() => {
		setOpenAutoComplete(!!autoCompleteList.length);
	}, [autoCompleteList, showResult]);

	const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;

		setInputValue(value || "");
		setAutoCompleteEnabled(!!value);
		setShowResult(false);

		if (!value) {
			router.push("/search");
		}
	};

	const handleDeleteClick = () => {
		setInputValue("");
		setSearchFilters((prev) => ({
			...prev,
			bid: null,
			placeName: "",
		}));

		setShowResult(false);
	};

	const handleOptionClick = (key: string) => {
		switch (searchType) {
			case "bias":
				setSearchFilters((prev) => ({
					...prev,
					searchType: key,
					placeName: "",
				}));
				break;

			case "place":
				setSearchFilters((prev) => ({
					...prev,
					searchType: key,
					bid: null,
					biasName: "",
				}));
				break;

			default:
				break;
		}
		setToggle(false);
	};

	const handleAutoCompletedBiasClick = (biasData: AutoCompleteDataType) => {
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

		router.push({
			pathname,
			query: { type: "bias", bid: biasData.id },
		});
	};

	const handleAutoCompletedPlaceClick = (data: string) => {
		setSearchFilters((prev) => ({
			...prev,
			placeName: data,
		}));

		setInputValue(data);
		setOpenAutoComplete(false);
		setAutoCompleteEnabled(false);
		setShowResult(true);

		router.push({
			pathname,
			query: { type: "place", name: data },
		});
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
				value={inputValue || ""}
				placeholder="검색어를 입력해주세요."
				onChange={handleInputChange}
			/>
			{openAutoComplete && !showResult ? (
				<ul className="autoComplete">
					{autoCompleteList.map((row) => (
						<li
							key={row.id || row}
							role="presentation"
							onClick={() =>
								searchType === "bias"
									? handleAutoCompletedBiasClick(row)
									: handleAutoCompletedPlaceClick(row)
							}
						>
							<p>{row.text || row}</p>
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
