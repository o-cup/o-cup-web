import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { StyledSearchInput } from "../../styles/filterStyle";

function SearchInput() {

    const [keyword, setKeyword] = useState("")

    return (
        <StyledSearchInput>
            <RiSearchLine />
            <input value={keyword}
                onChange={(e) => setKeyword(e.target.value)} />
        </StyledSearchInput>
    )
}

export default SearchInput;