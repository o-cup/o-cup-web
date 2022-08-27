import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useQuery } from "react-query";
import { fetchPeople } from "../../../apis";
import { StyledArtistInput } from "./artistInputStyle";
import { StyledSearchListContainer, StyledSearchList } from "../units/searchListStyle";
import { DeleteBtn } from "../units/basicInputStyle";
import SearchInput from "../units/SearchInput";
import { PeopleType } from "../../../types";

export type ArtistValues = {
  id: number;
  peopleId: number;
  bias: string;
  team: string;
}

type InputProps = {
  value: ArtistValues;
  handleChangeArtist: (peopleId: number, bias: string, team: string, index: number) => void;
};

const ArtistInput = ({ value, handleChangeArtist }: InputProps) => {
  const resultString = value.bias ? `${value.bias}${value.team ? ` (${value.team})` : ""}` : "";

  const [isSearchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState(""); // 검색 키워드

  const [isInputOpen, setInputOpen] = useState(false);
  const [customArtist, setCustomArtist] = useState({
    bias: "",
    team: ""
  });

  const { data: people } = useQuery(["people"], () => fetchPeople(), {
    select: (data) => data?.filter((item) => item.name.includes(keyword))
  });

  const handleClickSelect = (biasInfo: PeopleType) => {
    handleChangeArtist(biasInfo.id, biasInfo.name, biasInfo.team.join(", "), value.id);
    setKeyword("");
    setSearchOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomArtist({
      ...customArtist,
      [e.target.id]: e.target.value
    });
  };

  const handleInputDelete = (e: React.MouseEvent, id: string) => {
    setCustomArtist((prev) => ({
      ...prev,
      [id]: ""
    }));
  };

  const handleConfirmCustomInput = () => {
    handleChangeArtist(0, customArtist.bias, customArtist.team, value.id);
    setInputOpen(false);
  };

  return (
    <StyledArtistInput>
      <SearchInput value={resultString}
                   handleClickSearchBtn={() => {
                     setSearchOpen(!isSearchOpen);
                     setInputOpen(false);
                   }}
                   id="artist"
                   placeholder="아티스트 이름"
                   label="아티스트 이름"
                   hideLabel={value.id > 1} />

      {isSearchOpen && <StyledSearchListContainer>
        <div className="inputContainer">
          <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          <div className="buttonContainer">
            <FaTimes onClick={() => setKeyword("")} />
            <FaSearch />
          </div>
        </div>
        <StyledSearchList>
          {people?.map((bias) =>
            <li key={bias.id}>
              <div>
                <p>{bias.name} ({bias.team.join(", ")})</p>
              </div>
              <button type="button" onClick={() => handleClickSelect(bias)}>선택</button>
            </li>)}
          <li>
            <div>
              <p>직접 입력하기</p>
            </div>
            <button type="button" onClick={() => {
              setSearchOpen(false);
              setInputOpen(true);
            }}>선택
            </button>
          </li>
        </StyledSearchList>
      </StyledSearchListContainer>}

      {isInputOpen && <div className="customInputContainer">
        <div className="customInputs">
          <div>
            <input id="bias"
                   value={customArtist.bias}
                   placeholder="아티스트 (한글명)"
                   onChange={handleInputChange} />
            {!!customArtist.bias && <DeleteBtn onClick={(e) => handleInputDelete(e, "bias")} />}
          </div>
          <div>
            <input id="team"
                   value={customArtist.team}
                   placeholder="소속 그룹 (한글명, 선택사항)"
                   onChange={handleInputChange} />
            {!!customArtist.team && <DeleteBtn onClick={(e) => handleInputDelete(e, "team")} />}
          </div>
        </div>
        <div className="customConfirm">
          <input value={customArtist.team ? `${customArtist.bias} (${customArtist.team})` : customArtist.bias}
                 disabled />
          <button type="button" onClick={handleConfirmCustomInput}>입력완료</button>
        </div>
      </div>}
    </StyledArtistInput>
  );
};

ArtistInput.defaultProps = {};

export default ArtistInput;
