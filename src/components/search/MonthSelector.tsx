import React from "react";
import ToggleButton from "../../shared/components/ToggleButton";
import { StyledMonthSelector } from "./styles/monthSelectorStyle";

const MonthSelector = () => (
	<StyledMonthSelector>
		<h2>8월 생일 아티스트를 찾아보세요.</h2>

		<div className="toggle">
			<p>다른 생일 달 아티스트 찾아보기</p>
			<ToggleButton width={12} />
		</div>
	</StyledMonthSelector>
);

export default MonthSelector;
