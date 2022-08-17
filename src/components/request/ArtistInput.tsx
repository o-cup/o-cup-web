import React, { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useQuery } from "react-query";
import { fetchPeople } from "../../apis";
import { StyledArtistInput } from "./styles/artistInputStyle";
import { StyledPlaceContainer, StyledPlaceList } from "./styles/placeInputStyle";
import SearchInput from "./SearchInput";
import { PeopleType } from "../../types";
import BasicInput from "./BasicInput";

export type ArtistValues = {
  id: number;
  bias: string;
  team: string;
}

type InputProps = {
  value: ArtistValues;
  handleChangeArtist: (bias: string, team: string, index: number) => void;
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
    handleChangeArtist(biasInfo.name, biasInfo.team.join(", "), value.id);
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

  useEffect(() => {
    handleChangeArtist(customArtist.bias, customArtist.team, value.id);
  }, [customArtist]);

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
              <p>직접 입력하기</p>
            </div>
            <button type="button" onClick={() => {
              setSearchOpen(false);
              setInputOpen(true);
            }}>선택
            </button>
          </li>
        </StyledPlaceList>
      </StyledPlaceContainer>}

      {isInputOpen && <div className="customInputContainer">
        <BasicInput label="" hideLabel
                    id="bias"
                    placeholder="아티스트 (한글명)"
                    value={customArtist.bias}
                    handleInputChange={handleInputChange}
                    handleInputDelete={(e) => handleInputDelete(e, "bias")} />
        <BasicInput label="" hideLabel
                    id="team"
                    placeholder="소속 그룹 (한글명, 선택사항)"
                    value={customArtist.team}
                    handleInputChange={handleInputChange}
                    handleInputDelete={(e) => handleInputDelete(e, "team")} />
      </div>}

    </StyledArtistInput>
  );
};

ArtistInput.defaultProps = {};

export default ArtistInput;