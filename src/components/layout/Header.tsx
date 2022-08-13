import React from "react";
import DateSelector from "../header/DateSelector";
import { StyledHeader } from "./styles/layoutStyle";

type HeaderProps = {
	dateSelector: boolean;
};

function Header({ dateSelector }: HeaderProps) {
	return (
		<StyledHeader>
			오컵
			{dateSelector && <DateSelector />}
		</StyledHeader>
	);
}

export default Header;
