import React from "react";
import { Icon } from "../../../shared/components";
import { StyledFilter } from "./style";

type FiltersType = {
	[key: string]: {
		icon: string;
		name: string;
		status: string;
	};
};

const filters = {
	calendar: {
		icon: "calendar",
		name: "날짜",
		status: "미선택",
	},
	district: {
		icon: "place",
		name: "지역",
		status: "미선택",
	},
	category: {
		icon: "category",
		name: "이벤트 종류",
		status: "미선택",
	},
} as FiltersType;

const Filter = ({ type }: { type: "calendar" | "district" | "category" }) => (
	<StyledFilter>
		<div className="text">
			<div>
				<Icon name={filters[type].icon} />
				<p>{filters[type].name}</p>
			</div>
			<small>미선택</small>
		</div>
		<div className="icon">
			<Icon name="arrow-right" />
		</div>
	</StyledFilter>
);
export default Filter;
