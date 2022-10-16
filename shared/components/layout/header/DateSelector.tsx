import React from "react";
import Icon from "../../icon";
import { StyledDateSelector } from "./style";

type StateProps = {
	isCalendarOpen: boolean;
	setCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DateSelector({ isCalendarOpen, setCalendarOpen }: StateProps) {
	return (
		<StyledDateSelector>
			<Icon
				name="calendar_header"
				handleClick={() => setCalendarOpen(!isCalendarOpen)}
			/>
		</StyledDateSelector>
	);
}

export default DateSelector;
