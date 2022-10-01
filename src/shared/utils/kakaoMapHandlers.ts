export const setKakaoMapKey = () => {
	if (!document.querySelector("#kakaoMap")) {
		const kakaoScript = document.createElement("script");
		kakaoScript.id = "kakaoMap";
		kakaoScript.src =
			"//dapi.kakao.com/v2/maps/sdk.js?appkey=aa90b5cd8734fb0ed66e4f3aab95a147&autoload=false&libraries=services";
		document.head.appendChild(kakaoScript);
	}
};

export default {};
