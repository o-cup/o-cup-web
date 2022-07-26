import React, { SetStateAction, Dispatch, useRef } from "react";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import DistrictSelector from "./DistrictSelector";
import "./react-spring-bottom-sheet.css";

type CustomBottomSheetProps = {
	setOpen: Dispatch<SetStateAction<boolean>>;
};

const CustomBottomSheet = ({ setOpen }: CustomBottomSheetProps) => {
	const sheetRef = useRef<BottomSheetRef>(null);

	return (
		<BottomSheet open ref={sheetRef} onDismiss={() => setOpen(false)}>
			<DistrictSelector />
		</BottomSheet>
	);
};

export default CustomBottomSheet;
