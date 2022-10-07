import React from "react";
import { StyledDateSelector } from "./headerStyle";
import Icons from "../../Icon/Icons";

type StateProps = {
	isCalendarOpen: boolean;
	setCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DateSelector({ isCalendarOpen, setCalendarOpen }: StateProps) {
	return (
		<StyledDateSelector>
			<Icons name="calendar_header" handleClick={() => setCalendarOpen(!isCalendarOpen)} />
		</StyledDateSelector>
	);
}

export default DateSelector;
