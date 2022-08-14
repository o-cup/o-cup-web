import React, { useState } from "react";
import BasicInput from "../components/request/BasicInput";
import Entry from "../components/request/Entry";
import { StyledRequest } from "../components/request/styles/requestStyle";
import Layout from "../shared/components/layout";

// TODO: 장소 등록 header 컴포넌트로 렌더링 할 수 있도록 수정하기
// TODO: Entry, Preview 컴포넌트 분리하기
const Request = () => (
	<Layout>
		<StyledRequest>
			<Entry />
			<div className="previewField" />
		</StyledRequest>
	</Layout>
);

export default Request;
