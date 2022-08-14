import React from "react";
import { StyledRequest } from "../components/request/styles/requestStyle";
import Layout from "../shared/components/layout";

// TODO: 장소 등록 header 컴포넌트로 렌더링 할 수 있도록 수정하기
const Request = () => (
	<Layout>
		<StyledRequest>
			<div className="notice">
				<p>장소 등록 시 주의사항</p>
				<p>
					오늘의 컵홀더는 특전 증정이 있는 이벤트에 한해 정보를 제공합니다. <br />
					따라서 특전이 없는 포토부스, 옥외 광고 등의 이벤트는 신청받지/등록되지/승인되지 않습니다.
				</p>
			</div>
		</StyledRequest>
	</Layout>
);

export default Request;
