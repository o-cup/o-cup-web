import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { requestInputsAtom } from "../../../state/atoms";
import { StyledPlaceInput } from "./placeInputStyle";
import { StyledSearchListContainer, StyledSearchList } from "../units/searchListStyle";
import SearchInput from "../units/SearchInput";
import { removeKakaoMapKey, setKakaoMapKey } from "../../../shared/utils/kakaoMapHandlers";

type KakaoResult = {
	id: string; // "1376253571"
	place_name: string; // "로우앤슬로우"
	road_address_name: string; // "서울 용산구 보광로 126"
};

const KakaoAxios = axios.create({
	baseURL: "//dapi.kakao.com",
	headers: {
		Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_KEY}`,
	},
});

// 법정동 코드 검색
const bCodeSearch = (params: { query: string }) => KakaoAxios.get("/v2/local/search/address.json", { params });

const PlaceInput = () => {
	const [requestInputs, setRequestInputs] = useRecoilState(requestInputsAtom);

	const [isSearchOpen, setSearchOpen] = useState(false);
	const [keyword, setKeyword] = useState("");
	const [placeList, setPlaceList] = useState([] as KakaoResult[]);

	const { kakao } = window as any;

	useEffect(() => {
		setKakaoMapKey();
		return () => {
			removeKakaoMapKey();
		};
	}, []);

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

	const handleClickSelect = (placeInfo: KakaoResult) => {
		const districtArr = placeInfo.road_address_name.split(" ");

		bCodeSearch({ query: placeInfo.road_address_name }).then((res) => {
			if (res.data) {
				setRequestInputs({
					...requestInputs,
					place: {
						place: placeInfo.place_name,
						district: `${districtArr[0]} ${districtArr[1]}`,
						newDistrict: { code: res.data.documents[0].address.b_code, name: `${districtArr[0]} ${districtArr[1]}` },
						address: placeInfo.road_address_name,
					},
				});
				setKeyword("");
				setSearchOpen(false);
			}
		});
	};

	return (
		<StyledPlaceInput>
			<SearchInput
				value={requestInputs.place.place}
				handleClickSearchBtn={() => setSearchOpen(!isSearchOpen)}
				id="place"
				placeholder="장소이름"
				label="장소 *"
			/>
			{isSearchOpen && (
				<StyledSearchListContainer>
					<div className="inputContainer">
						<input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="예) 카페 오컵" />
						<div className="buttonContainer">
							<FaTimes onClick={() => setKeyword("")} />
							<FaSearch />
						</div>
					</div>
					{placeList.length > 0 && (
						<StyledSearchList>
							{placeList.map((place) => (
								<li key={place.id}>
									<div>
										<h4>{place.place_name}</h4>
										<p>{place.road_address_name}</p>
									</div>
									<button type="button" onClick={() => handleClickSelect(place)}>
										선택
									</button>
								</li>
							))}
						</StyledSearchList>
					)}
				</StyledSearchListContainer>
			)}
			<SearchInput value={requestInputs.place.address} id="address" placeholder="주소" label="" hideLabel hideButton />
		</StyledPlaceInput>
	);
};

export default React.memo(PlaceInput);
