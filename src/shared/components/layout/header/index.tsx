import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledHeader } from "../styles/layoutStyle";
import DateSelector from "./DateSelector";
import HeaderCalendar from "./HeaderCalendar";
import Icon from "../../Icon/Icons";

type HeaderProps = {
	title?: string;
};
function Header({ title }: HeaderProps) {
	const navigate = useNavigate();
	const [isCalendarOpen, setCalendarOpen] = useState(false);
	const mainPage = !title;

	return (
		<StyledHeader mainPage={mainPage}>
			<div id="header">
				<Icon name="logo" handleClick={() => navigate("/")} />
				{title && <h1>{title}</h1>}

				<div>
					{mainPage && <DateSelector isCalendarOpen={isCalendarOpen} setCalendarOpen={setCalendarOpen} />}
					{isCalendarOpen && <HeaderCalendar setCalendarOpen={setCalendarOpen} />}
					<Icon name="search" handleClick={() => navigate("/search")} />
				</div>
			</div>
		</StyledHeader>
	);
}

Header.defaultProps = {
	title: "",
};

export default Header;
