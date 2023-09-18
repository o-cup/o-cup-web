/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { requestInputsAtom } from "../../../shared/state";
import BasicInput from "../units/BasicInput";
import SearchInput from "../units/SearchInput";
import {
    StyledSearchListContainer,
    StyledSearchList,
} from "../units/searchListStyle";
import { StyledPlaceCustomInput, StyledPlaceInput } from "./placeInputStyle";

declare global {
    interface Window {
        kakao: any;
    }
}

type KakaoResult = {
    id: string; // "1376253571"
    place_name: string; // "로우앤슬로우"
    road_address_name: string; // "서울 용산구 보광로 126"
};

const PlaceInput = () => {
    const [requestInputs, setRequestInputs] = useRecoilState(requestInputsAtom);

    const [isSearchOpen, setSearchOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [placeList, setPlaceList] = useState([] as KakaoResult[]);

    const [isInputOpen, setInputOpen] = useState(false);
    const [customPlace, setCustomPlace] = useState({
        place: "",
        address1: "",
        address2: "",
    });

    const onLoadKakaoMap = (k: string) => {
        window.kakao?.maps?.load(() => {
            // 장소 검색 객체를 생성합니다
            const ps = new window.kakao.maps.services.Places();

            // 키워드 검색 완료 시 호출되는 콜백함수 입니다
            function placesSearchCB(
                data: React.SetStateAction<KakaoResult[]>,
                status: string
            ) {
                if (status === window.kakao.maps.services.Status.OK) {
                    setPlaceList(data);
                }
            }

            // 키워드로 장소를 검색합니다
            ps.keywordSearch(k, placesSearchCB);
        });
    };

    useEffect(() => {
        if (
            window.location.origin === "https://www.o-cup.kr" ||
            window.location.origin === "https://www.o-cup.com" ||
            window.location.origin === "http://localhost:3000"
        ) {
            if (keyword) {
                onLoadKakaoMap(keyword);
            }
            // } else {
            // alert("해당 url에서는 장소등록이 불가능합니다.");
        }
    }, [keyword]);

    const handleClickSelect = (placeInfo: KakaoResult) => {
        const districtArr = placeInfo.road_address_name.split(" ");
        setRequestInputs({
            ...requestInputs,
            place: {
                place: placeInfo.place_name,
                districts: {
                    code: "", // 중복확인 후 법정동 코드 저장
                    name: `${districtArr[0]} ${districtArr[1]}`,
                },
                address: placeInfo.road_address_name,
            },
        });

        setKeyword("");
        setSearchOpen(false);
    };

    const handleChangeCustomPlace = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: string
    ) => {
        if (id === "place" || id === "address1" || id === "address2") {
            setCustomPlace({
                ...customPlace,
                [id]: e.target.value,
            });
        }
    };

    const handleDeleteCustomPlace = (e: React.MouseEvent, id: string) => {
        if (id === "place" || id === "address1" || id === "address2") {
            setCustomPlace({
                ...customPlace,
                [id]: "",
            });
        }
    };

    useEffect(() => {
        if (isInputOpen) {
            const districtArr = customPlace.address1.split(" ");
            setRequestInputs({
                ...requestInputs,
                place: {
                    place: customPlace.place,
                    districts: {
                        code: "", // 중복확인 후 법정동 코드 저장
                        name: `${districtArr[0]} ${districtArr[1]}`,
                    },
                    address:
                        customPlace.address1 +
                        (customPlace.address2 && `${customPlace.address2}`),
                },
            });
        }
    }, [customPlace]);

    return (
        <StyledPlaceInput>
            {!isInputOpen && (
                <SearchInput
                    value={requestInputs.place.place}
                    handleClickInput={() => setSearchOpen(!isSearchOpen)}
                    handleClickSearchBtn={() => setSearchOpen(!isSearchOpen)}
                    id="place"
                    placeholder="장소이름"
                    label="장소 *"
                />
            )}
            {isSearchOpen && (
                <StyledSearchListContainer>
                    <div className="inputContainer">
                        <input
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="예) 카페 오컵"
                        />
                        <div className="buttonContainer">
                            <FaTimes onClick={() => setKeyword("")} />
                            <FaSearch />
                        </div>
                    </div>
                    {placeList.length > 0 && (
                        <StyledSearchList>
                            {placeList.map((place) => (
                                <li
                                    key={place.id}
                                    role="presentation"
                                    onClick={() => handleClickSelect(place)}
                                >
                                    <div>
                                        <h4>{place.place_name}</h4>
                                        <p>{place.road_address_name}</p>
                                    </div>
                                    <button type="button">선택</button>
                                </li>
                            ))}
                            <li>
                                <div>
                                    <p>직접 입력하기</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchOpen(false);
                                        setInputOpen(true);
                                        setCustomPlace({
                                            place: keyword,
                                            address1: "",
                                            address2: "",
                                        });
                                    }}
                                >
                                    선택
                                </button>
                            </li>
                        </StyledSearchList>
                    )}
                </StyledSearchListContainer>
            )}
            {isInputOpen && (
                <StyledPlaceCustomInput>
                    <BasicInput
                        label="장소 *"
                        value={customPlace.place}
                        id="place"
                        placeholder="장소이름"
                        handleInputChange={(e) =>
                            handleChangeCustomPlace(e, "place")
                        }
                        handleInputDelete={(e) =>
                            handleDeleteCustomPlace(e, "place")
                        }
                    />

                    <div className="address">
                        <BasicInput
                            label=""
                            hideLabel
                            value={customPlace.address1}
                            id="address1"
                            placeholder="주소 (도로명, 지번)"
                            handleInputChange={(e) =>
                                handleChangeCustomPlace(e, "address1")
                            }
                            handleInputDelete={(e) =>
                                handleDeleteCustomPlace(e, "address1")
                            }
                        />
                        <BasicInput
                            label=""
                            hideLabel
                            value={customPlace.address2}
                            id="address2"
                            placeholder="상세주소 (층 수, 생략 가능)"
                            handleInputChange={(e) =>
                                handleChangeCustomPlace(e, "address2")
                            }
                            handleInputDelete={(e) =>
                                handleDeleteCustomPlace(e, "address2")
                            }
                        />
                    </div>
                </StyledPlaceCustomInput>
            )}
            {!isInputOpen && (
                <SearchInput
                    value={requestInputs.place.address}
                    id="address"
                    placeholder="주소"
                    label=""
                    hideLabel
                    hideButton
                />
            )}
        </StyledPlaceInput>
    );
};

export default React.memo(PlaceInput);
