import React from "react";
import { FaSearch } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { keywordAtom } from "../../../state/atoms";
import { StyledSearchInput } from "../../../styles/filterStyle";

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
