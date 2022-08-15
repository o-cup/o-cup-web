import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useQuery } from "react-query";
import { fetchPeople } from "../../apis";
import { StyledArtistInput } from "./styles/artistInputStyle";
import { StyledPlaceContainer, StyledPlaceList } from "./styles/placeInputStyle";
import SearchInput from "./SearchInput";
import { PeopleType } from "../../types";

export type ArtistValues = {
  id: number;
  bias: string;
  team: string;
}

type InputProps = {
  value: ArtistValues[];
  setValue: React.Dispatch<React.SetStateAction<ArtistValues[]>>;
};

const ArtistInput = ({ value, setValue }: InputProps) => {
  const resultString = value.map((v) => v.bias ? `${v.bias}${v.team ? ` (${v.team})` : ""}` : "").join(", ");

  const [isSearchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const { data: people } = useQuery(["people"], () => fetchPeople(), {
    select: (data) => data?.filter((item) => item.name.includes(keyword))
  });

  const handleClickSelect = (biasInfo: PeopleType) => {
    setValue([
      ...value.slice(0, value.length - 1),
      {
        id: value.length,
        bias: biasInfo.name,
        team: biasInfo.team.join(", ")
      }
    ]);
    setKeyword("");
    setSearchOpen(false);
  };

  const handleClickAdd = () => {
    setValue([
      ...value,
      {
        id: value.length + 1,
        bias: "",
        team: ""
      }
    ]);
    setKeyword("");
    setSearchOpen(true);
  };

  return (
    <StyledArtistInput>
      <SearchInput value={resultString} handleClickSearchBtn={() => setSearchOpen(!isSearchOpen)}
                   id="artist" placeholder="아티스트 이름" label="아티스트 이름" />
      {isSearchOpen && <StyledPlaceContainer>
        <div className="inputContainer">
          <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          <div className="buttonContainer">
            <FaTimes onClick={() => setKeyword("")} />
            <FaSearch />
          </div>
        </div>
        <StyledPlaceList>
          {people?.map((bias) =>
            <li key={bias.id}>
              <div>
                <p>{bias.name} ({bias.team.join(", ")})</p>
              </div>
              <button type="button" onClick={() => handleClickSelect(bias)}>선택</button>
            </li>)}
          <li>
            <div>
              <p>직접 입력하기 //todo</p>
            </div>
            <button type="button">선택</button>
          </li>
        </StyledPlaceList>
      </StyledPlaceContainer>}
      <button type="button" onClick={handleClickAdd}>다른 아티스트 추가하기</button>
    </StyledArtistInput>
  );
};

ArtistInput.defaultProps = {};

export default ArtistInput;
