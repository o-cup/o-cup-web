import React from "react";
import { Icon } from "../../../shared/components";
import { StyledFilter } from "./styles/filterBottomSheetStyle";
import type { Dispatch, SetStateAction } from "react";

type FilterProps = {
	type: string | null;
	data: any;
	setCurrentFilter: Dispatch<SetStateAction<string | null>>;
};

const Filter = ({ type, data, setCurrentFilter }: FilterProps) => {
	if (!type) return null;

	return (
		<StyledFilter onClick={() => setCurrentFilter(type)}>
			<div className="text">
				<div>
					<Icon name={data.icon} />
					<p>{data.name}</p>
				</div>
				<small>미선택</small>
			</div>
			<div className="icon">
				<Icon name="arrow-right" />
			</div>
		</StyledFilter>
	);
};
export default Filter;
