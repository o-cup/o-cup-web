import React from "react";
import { BottomSheet, Icon } from "../../../shared/components";
import { ResetButton } from "../styles/searchStyle";
import Filter from "./Filter";
import { StyledCustomHeader, StyledFilterBottomSheet } from "./style";
import type { SetStateAction, Dispatch } from "react";

type FilterBottomSheetProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const FilterBottomSheet = ({ isOpen, setIsOpen }: FilterBottomSheetProps) => {
	const headerElements = (
		<StyledCustomHeader>
			<h2>필터</h2>
			<ResetButton onClick={() => console.log("초기화")} className="reset">
				<Icon name="reset" />
				<span>초기화</span>
			</ResetButton>
		</StyledCustomHeader>
	);

	return (
		<BottomSheet
			open={isOpen}
			setOpen={() => setIsOpen(false)}
			customHeader={headerElements}
			close
			slider
			buttons={{
				title: "제출하기",
				handleClick: () => console.log("hello"),
			}}
		>
			<StyledFilterBottomSheet>
				<Filter type="calendar" />
				<Filter type="district" />
				<Filter type="category" />
			</StyledFilterBottomSheet>
		</BottomSheet>
	);
};

export default FilterBottomSheet;
