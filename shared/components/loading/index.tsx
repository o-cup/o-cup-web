import React, { memo } from "react";
import { LoadingSpinnerWrapper, LoadingContainerStyle } from "./loadingStyle";

const Loading = () => (
	<LoadingContainerStyle>
		<LoadingSpinnerWrapper>
			<div />
			<div />
			<div />
			<div />
		</LoadingSpinnerWrapper>
	</LoadingContainerStyle>
);

export default memo(Loading);
