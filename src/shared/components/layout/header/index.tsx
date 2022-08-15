import React from "react";
import { StyledHeader } from "../styles/layoutStyle";
import DateSelector from "./DateSelector";

type HeaderProps = {
	dateSelector: boolean;
};

function Header({ dateSelector }: HeaderProps) {
	return (
		<StyledHeader>
			<img src="images/logo_primary.png" alt="o-cup" id="logo" />
			{dateSelector && <DateSelector />}
		</StyledHeader>
	);
}

export default Header;
