import React, { useEffect, useRef } from "react";
import { EventType } from "../../../types";
import { StyledMap } from "../styles/locationStyle";
import { removeKakaoMapKey, setKakaoMapKey } from "../../../shared/utils/kakaoMapHandlers";

function Map({ address }: Partial<EventType>) {
	const { kakao } = window as any;

	const container = useRef<HTMLDivElement>(null);

	const searchAddress = address || "서울 중구 세종대로 110";

	useEffect(() => {
		setKakaoMapKey();
		return () => {
			removeKakaoMapKey();
		};
	}, []);

	const onLoadKakaoMap = () => {
		kakao.maps.load(() => {
			const mapOption = {
				center: new kakao.maps.LatLng(127.044754852849, 37.5491962171866), // 지도의 중심좌표
				level: address ? 2 : 40, // 지도의 확대 레벨
			};

			// 지도를 생성합니다
			const map = new kakao.maps.Map(container.current, mapOption);

			// 주소-좌표 변환 객체를 생성합니다
			const geocoder = new kakao.maps.services.Geocoder();

			// 주소로 좌표를 검색합니다
			geocoder.addressSearch(searchAddress, (result: any, status: any) => {
				// 정상적으로 검색이 완료됐으면
				if (status === kakao.maps.services.Status.OK) {
					const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

					// 결과값으로 받은 위치를 마커로 표시합니다
					const marker = new kakao.maps.Marker({
						map,
						position: coords,
					});

					// 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
					map.setCenter(coords);
				} else {
					console.log("Kakao Map:", result);
				}
			});
		});
	};

	useEffect(() => {
		if (kakao) {
			if (kakao.maps) {
				onLoadKakaoMap(); // 첫 로딩 시
			} else {
				kakao.addEventListener("load", onLoadKakaoMap); // 새로고침 시
			}
		}
	}, [kakao]);

	return <StyledMap ref={container} />;
}

export default Map;
