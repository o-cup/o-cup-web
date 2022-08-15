import React, { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { StyledPlaceContainer, StyledPlaceInput, StyledPlaceList } from "./styles/placeInputStyle";
import SearchInput from "./SearchInput";

type PlaceValues = {
  place: string;
  district: string;
  address: string;
}

type InputProps = {
  value: PlaceValues;
  setValue: React.Dispatch<React.SetStateAction<PlaceValues>>;
};

type kakaoResult = {
  id: string; // "1376253571"
  place_name: string; // "로우앤슬로우"
  road_address_name: string; // "서울 용산구 보광로 126"
}

const PlaceInput = ({ value, setValue }: InputProps) => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [placeList, setPlaceList] = useState([] as kakaoResult[]);

  const { kakao } = window as any;

  const onLoadKakaoMap = (k: string) => {
    kakao.maps.load(() => {
      // 장소 검색 객체를 생성합니다
      const ps = new kakao.maps.services.Places();

      // 키워드 검색 완료 시 호출되는 콜백함수 입니다
      function placesSearchCB(data: any, status: string) {
        if (status === kakao.maps.services.Status.OK) {
          setPlaceList(data);
          // console.log(data);
        }
      }

      // 키워드로 장소를 검색합니다
      ps.keywordSearch(k, placesSearchCB);
    });
  };

  useEffect(() => {
    if (keyword) {
      onLoadKakaoMap(keyword);
    }
  }, [keyword]);

  const handleClickSelect = (placeInfo: kakaoResult) => {
    const districtArr = placeInfo.road_address_name.split(" ");
    setValue({
      place: placeInfo.place_name,
      district: `${districtArr[0]} ${districtArr[1]}`,
      address: placeInfo.road_address_name
    });
    setKeyword("");
    setSearchOpen(false);
  };

  return (
    <StyledPlaceInput>
      <SearchInput value={value.place} handleClickSearchBtn={() => setSearchOpen(!isSearchOpen)}
                   id="place" placeholder="카페이름" label="장소" />
      {isSearchOpen && <StyledPlaceContainer>
        <div className="inputContainer">
          <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          <div className="buttonContainer">
            <FaTimes onClick={() => setKeyword("")} />
            <FaSearch />
          </div>
        </div>
        {placeList.length > 0 && <StyledPlaceList>
          {placeList.map((place) =>
            <li key={place.id}>
              <div>
                <h4>{place.place_name}</h4>
                <p>{place.road_address_name}</p>
              </div>
              <button type="button" onClick={() => handleClickSelect(place)}>선택</button>
            </li>)}
        </StyledPlaceList>}
      </StyledPlaceContainer>}
      <SearchInput value={value.address} id="address" placeholder="주소" label="" hideLabel hideButton />
    </StyledPlaceInput>
  );
};

export default PlaceInput;
