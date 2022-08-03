import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
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
			<RiSearchLine />
			<input value={keyword} onChange={handleInputChange} />
		</StyledSearchInput>
	);
}

export default SearchInput;
