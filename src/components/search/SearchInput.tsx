import React, { Dispatch, SetStateAction } from "react";
import Icon from "../../shared/components/Icon/Icons";
import { StyledSearchInput } from "./styles/searchInputStyle";

type SearchInputProps = {
	keyword: string;
	setKeyword: Dispatch<SetStateAction<string>>;
	setSearched: Dispatch<SetStateAction<boolean>>;
};

const SearchInput = ({ keyword, setKeyword, setSearched }: SearchInputProps) => {
	const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		setKeyword(value);
		setSearched(false);
	};

	const handleEnter = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.key !== "Enter") return;

		e.preventDefault();
		setSearched(true);
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
			{keyword && <Icon name="delete" handleClick={() => setKeyword("")} />}
		</StyledSearchInput>
	);
};

export default SearchInput;
