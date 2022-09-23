import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { EventType } from "../../../types";
import { StyledFullMap } from "../styles/mapStyle";

type MapProps = {
	events: EventType[];
	setLoading: Dispatch<SetStateAction<boolean>>;
};

type MarkerContentType = {
	title: string;
	latlng: any;
};

function FullMap({ events, setLoading }: MapProps) {
	const { kakao } = window as any;

	const fullContainer = useRef<HTMLDivElement>(null);

	const onLoadKakaoMap = () => {
		const markerContents = [] as MarkerContentType[];

		kakao.maps.load(() => {
			const mapOption = {
				center: new kakao.maps.LatLng(127.044754852849, 37.5491962171866), // 지도의 중심좌표
				level: events.length > 0 ? 2 : 40, // 지도의 확대 레벨
			};

			// 지도를 생성합니다
			const map = new kakao.maps.Map(fullContainer.current, mapOption);

			// 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
			const bounds = new kakao.maps.LatLngBounds();

			events.forEach((event) => {
				const pin = {} as MarkerContentType;
				pin.title = event.place;

				// 주소-좌표 변환 객체를 생성합니다
				const geocoder = new kakao.maps.services.Geocoder();

				// 주소로 좌표를 검색합니다
				// TODO: 상세주소로 변경 필요
				geocoder.addressSearch(event.newDistrict.name, (result: any, status: any) => {
					if (status === kakao.maps.services.Status.OK) {
						const latLng = new kakao.maps.LatLng(result[0].y, result[0].x);
						pin.latlng = latLng;

						markerContents.push(pin);

						// 결과값으로 받은 위치를 마커로 표시합니다
						const marker = new kakao.maps.Marker({
							position: pin.latlng,
							title: pin.title,
						});

						marker.setMap(map);

						// LatLngBounds 객체에 좌표를 추가합니다
						bounds.extend(pin.latlng);
						map.setBounds(bounds);

						setLoading(false);
					}
				});
			});
		});
	};

	useEffect(() => {
		if (kakao && events) {
			if (kakao.maps) {
				onLoadKakaoMap(); // 첫 로딩 시
			} else {
				kakao.addEventListener("load", onLoadKakaoMap); // 새로고침 시
			}
		}
	}, [kakao, events]);

	return <StyledFullMap ref={fullContainer} />;
}

export default FullMap;
