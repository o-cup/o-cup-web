import React from "react";
import { StyledHeader } from "../../styles/headerStyle";
import DateSelector from "../header/DateSelector";

type HeaderProps = {
	dateSelector: boolean;
};

function Header({dateSelector}: HeaderProps) {
	return (
		<header>
			<StyledHeader>
				오컵
				{dateSelector && <DateSelector />}
			</StyledHeader>
		</header>
	);
}

export default Header;
