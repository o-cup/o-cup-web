import React from "react";
import { Icon } from "../../../shared/components";
import { StyledFilter } from "./styles/filterBottomSheetStyle";
import type { Dispatch, SetStateAction } from "react";

type FilterProps = {
	type: string | null;
	filterTypeData: any;
	setCurrentFilter: Dispatch<SetStateAction<string | null>>;
	text: string;
};

const Filter = ({
	type,
	filterTypeData,
	setCurrentFilter,
	text,
}: FilterProps) => {
	if (!type) return null;

	const getDiscription = () => {
		let description = "미선택";

		const isAll = text.split(",").length === 5;

		if (type === "category" && isAll) {
			description = isAll ? "전체" : text;
		}

		return text || description;
	};

	return (
		<StyledFilter onClick={() => setCurrentFilter(type)}>
			<div className="text">
				<div>
					<Icon name={filterTypeData.icon} />
					<p>{filterTypeData.name}</p>
				</div>
				<small>{getDiscription()}</small>
			</div>
			<div className="icon">
				<Icon name="arrow-right" />
			</div>
		</StyledFilter>
	);
};
export default Filter;
