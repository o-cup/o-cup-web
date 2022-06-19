import React from "react";
import { StyledHeader } from "../../styles/headerStyle";
import DateSeletor from "../header/DateSelector";

function Header() {
	return (
		<header>
			<StyledHeader>
				오컵
				<DateSeletor />
			</StyledHeader>
		</header>
	);
}

export default Header;
