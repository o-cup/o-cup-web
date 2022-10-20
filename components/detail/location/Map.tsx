/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import { StyledMap } from "../styles/locationStyle";
import type { EventType } from "../../../shared/types";

declare global {
	interface Window {
		kakao: any;
	}
}

function Map({ address }: Partial<EventType>) {
	const container = useRef<HTMLDivElement>(null);

	const searchAddress = address || "서울 중구 세종대로 110";

	const onLoadKakaoMap = () => {
		window.kakao?.maps?.load(() => {
			const mapOption = {
				center: new window.kakao.maps.LatLng(
					127.044754852849,
					37.5491962171866
				), // 지도의 중심좌표
				level: address ? 2 : 40, // 지도의 확대 레벨
			};

			// 지도를 생성합니다
			const map = new window.kakao.maps.Map(container.current, mapOption);

			// 주소-좌표 변환 객체를 생성합니다
			const geocoder = new window.kakao.maps.services.Geocoder();

			// 주소로 좌표를 검색합니다
			geocoder.addressSearch(
				searchAddress,
				(result: { x: number; y: number }[], status: any) => {
					// 정상적으로 검색이 완료됐으면
					if (status === window.kakao.maps.services.Status.OK) {
						const coords = new window.kakao.maps.LatLng(
							result[0].y,
							result[0].x
						);

						// 결과값으로 받은 위치를 마커로 표시합니다
						// eslint-disable-next-line  @typescript-eslint/no-unused-vars
						const marker = new window.kakao.maps.Marker({
							map,
							position: coords,
						});

						// 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
						map.setCenter(coords);
					}
				}
			);
		});
	};

	useEffect(() => {
		if (window.kakao) {
			if (window.kakao.maps) {
				onLoadKakaoMap(); // 첫 로딩 시
			} else {
				window.kakao.addEventListener("load", onLoadKakaoMap); // 새로고침 시
			}
		}
	}, []);

	return <StyledMap ref={container} />;
}

export default Map;
