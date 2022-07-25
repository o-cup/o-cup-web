import React from "react";
import { StyledHeader } from "../../styles/layoutStyle";
import DateSelector from "../header/DateSelector";

type HeaderProps = {
	dateSelector: boolean;
};

function Header({dateSelector}: HeaderProps) {
	return (
			<StyledHeader>
				오컵
				{dateSelector && <DateSelector />}
			</StyledHeader>
	);
}

export default Header;
