import React from "react";
import Entry from "../components/request/Entry";
import { StyledRequest } from "../components/request/styles/requestStyle";
import Layout from "../shared/components/layout";

// TODO: 장소 등록 header 컴포넌트로 렌더링 할 수 있도록 수정하기
// TODO: input value는 실수로 새로고침 시 사라지지 않도록 atom session으로 관리 고려
const Request = () => (
	<Layout>
		<StyledRequest>
			<Entry />
		</StyledRequest>
	</Layout>
);

export default Request;
