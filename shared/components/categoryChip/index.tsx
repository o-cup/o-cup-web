import React from "react";
import { CATEGORY_DATA } from "../../constants";
import { StyledCategoryChip } from "./style";

type CategoryChipProps = {
	type: "A" | "B" | "C" | "D" | "E";
	handleClick?: (e: React.MouseEvent) => void;
	selected?: boolean;
	opacity?: number;
	disabled?: boolean; // 클릭방지
};

export const CATEGORY_TITLE = {
	A: "카페",
	B: "꽃집",
	C: "음식점",
	D: "포토부스",
	E: "기타",
};

const CategoryChip = ({
	type,
	handleClick,
	selected,
	opacity,
	disabled,
}: CategoryChipProps) => (
	<StyledCategoryChip
		type={type}
		onClick={handleClick}
		className={selected ? "selected" : ""}
		opacity={opacity}
		disabled={disabled}
	>
		<p>{CATEGORY_DATA[type]}</p>
		<span className="shadow" />
	</StyledCategoryChip>
);

CategoryChip.defaultProps = {
	handleClick: null,
	selected: false,
	opacity: 1,
	disabled: false,
};
export default CategoryChip;
