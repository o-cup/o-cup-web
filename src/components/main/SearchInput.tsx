import React, { Dispatch, SetStateAction } from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { keywordAtom } from "../../state/atoms";
import { StyledSearchInput } from "./styles/mainStyle";

function SearchInput({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
	const [keyword, setKeyword] = useRecoilState(keywordAtom);

	const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		setKeyword(value);
	};

	return (
		<StyledSearchInput>
			<FaSearch />
			<input value={keyword} onChange={handleInputChange} />
			<button type="button" onClick={() => setOpen(true)}>
				<FaMapMarkerAlt />
			</button>
		</StyledSearchInput>
	);
}

export default SearchInput;
