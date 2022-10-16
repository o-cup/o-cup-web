import React from "react";
import { StyledCategoryChip } from "./categoryChipStyle";

type CategoryChipProps = {
	type: "A" | "B" | "C" | "D" | "E";
	handleClick?: (e: any) => void;
	selected?: boolean;
	opacity?: number;
};

export const CATEGORY_TITLE = {
	A: "카페",
	B: "꽃집",
	C: "식당",
	D: "포토부스",
	E: "기타",
};

const CategoryChip = ({
	type,
	handleClick,
	selected,
	opacity,
}: CategoryChipProps) => (
	<StyledCategoryChip
		type={type}
		onClick={handleClick}
		className={selected ? "selected" : ""}
		opacity={opacity}
	>
		<p>{CATEGORY_TITLE[type]}</p>
		<span className="shadow" />
	</StyledCategoryChip>
);

CategoryChip.defaultProps = {
	handleClick: () => console.log("click"),
	selected: false,
	opacity: 1,
};
export default CategoryChip;
