import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { StyledSearchInput } from "../../styles/filterStyle";
import { keywordAtom } from "../../state/atoms";

function SearchInput() {
	const [keyword, setKeyword] = useRecoilState(keywordAtom);

	const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		setKeyword(value);
	};

	return (
		<StyledSearchInput>
			<FaSearch />
			<input value={keyword} onChange={handleInputChange} />
		</StyledSearchInput>
	);
}

export default SearchInput;
