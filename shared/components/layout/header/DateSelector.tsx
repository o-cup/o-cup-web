import React from "react";
import Icons from "../../icon";
import { StyledDateSelector } from "./style";

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
