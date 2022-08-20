import React, { Dispatch, SetStateAction } from "react";
import Icon from "../../shared/components/Icon/Icons";
import { StyledSearchInput } from "./styles/searchInputStyle";

type SearchInputProps = {
	keyword: string;
	setKeyword: Dispatch<SetStateAction<string>>;
};

const SearchInput = ({ keyword, setKeyword }: SearchInputProps) => {
	const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		setKeyword(value);
	};
	return (
		<StyledSearchInput>
			<input value={keyword} placeholder="카페 이름, 아티스트 이름, ..." onChange={handleInputChange} />
			<Icon name="search" />
		</StyledSearchInput>
	);
};

export default SearchInput;
