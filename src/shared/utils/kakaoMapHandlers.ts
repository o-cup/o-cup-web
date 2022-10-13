/** 사용 안함 */
export const setKakaoMapKey = () => {
	if (!document.querySelector("#kakaoMap")) {
		const kakaoMap = document.createElement("script");
		kakaoMap.id = "kakaoMap";
		kakaoMap.src =
			"//dapi.kakao.com/v2/maps/sdk.js?appkey=aa90b5cd8734fb0ed66e4f3aab95a147&autoload=false&libraries=services";
		document.head.appendChild(kakaoMap);
	}

	if (!document.querySelector("#kakaoJS")) {
		const kakaoJS = document.createElement("script");
		kakaoJS.id = "kakaoJS";
		kakaoJS.type = "text/javascript";
		kakaoJS.src = "https://developers.kakao.com/sdk/js/kakao.js";
		document.head.appendChild(kakaoJS);
	}
};

export const removeKakaoMapKey = () => {
	const kakaoMap = document.querySelector("#kakaoMap");
	if (kakaoMap) {
		kakaoMap.remove();
	}

	const kakaoJS = document.querySelector("#kakaoJS");
	if (kakaoJS) {
		kakaoJS.remove();
	}
};

export default {};
