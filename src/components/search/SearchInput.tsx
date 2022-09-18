import React, { Dispatch, SetStateAction } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Icon from "../../shared/components/Icon/Icons";
import { searchedAtom, searchFiltersAtom } from "../../state";
import { StyledSearchInput } from "./styles/searchInputStyle";

type SearchInputProps = {
	setSelectedBiasId: Dispatch<SetStateAction<null | number>>;
};

const SearchInput = ({ setSelectedBiasId }: SearchInputProps) => {
	const [searchFilters, setSearchFilters] = useRecoilState(searchFiltersAtom);
	const { keyword } = searchFilters;
	const setSearched = useSetRecoilState(searchedAtom);

	const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		setSearchFilters((prev) => ({ ...prev, keyword: value }));
		setSearched(false);
	};

	const handleEnter = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.key !== "Enter") return;

		e.preventDefault();
		setSearched(true);
	};

	const handleDeleteClick = () => {
		setSearchFilters((prev) => ({ ...prev, keyword: "" }));
		setSelectedBiasId(null);
	};

	return (
		<StyledSearchInput>
			<input
				value={keyword}
				placeholder="카페 이름, 아티스트 이름, ..."
				onChange={handleInputChange}
				onKeyDown={handleEnter}
			/>
			<Icon name="search" handleClick={() => setSearched(true)} />
			{keyword && <Icon name="delete" handleClick={handleDeleteClick} />}
		</StyledSearchInput>
	);
};

export default SearchInput;
