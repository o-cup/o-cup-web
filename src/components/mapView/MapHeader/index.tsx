import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledMapHeader } from "../styles/mapStyle";

const MapHeader = () => {
	const navigate = useNavigate();

	// TODO: 검색 페이지와 연동하기
	const [keyword, setKeyword] = useState("");

	return (
		<StyledMapHeader>
			<button type="button" onClick={() => navigate("/search", { replace: true })}>
				<img src="/images/icons/arrow-left.png" alt="back" />
			</button>
			<div className="mapSearchInput">
				<input />
			</div>
			<button type="button">
				<img src="/images/icons/share.png" alt="share" />
			</button>
		</StyledMapHeader>
	);
};

export default MapHeader;
