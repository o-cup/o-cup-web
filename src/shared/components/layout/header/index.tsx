import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledHeader } from "../styles/layoutStyle";
import DateSelector from "./DateSelector";
import HeaderCalendar from "./HeaderCalendar";
import Icon from "../../Icon/Icons";

type Titles = {
	[key: string]: string;
	request: string;
	search: string;
};

const titles = {
	request: "장소 등록",
	search: "검색하기",
} as Titles;

type HeaderProps = {
	page: string;
};

const Header = ({ page }: HeaderProps) => {
	const navigate = useNavigate();
	const [isCalendarOpen, setCalendarOpen] = useState(false);
	const mainPage = page === "main";

	return (
		<StyledHeader mainPage={mainPage}>
			<div id="header">
				{page === "search" ? <Icon name="arrow-left" /> : <Icon name="logo" handleClick={() => navigate("/")} />}

				{page && <h1>{titles[page]}</h1>}
				<div>
					{mainPage && <DateSelector isCalendarOpen={isCalendarOpen} setCalendarOpen={setCalendarOpen} />}
					{page !== "search" && <Icon name="search" handleClick={() => navigate("/search")} />}
				</div>
			</div>
			{isCalendarOpen && <HeaderCalendar setCalendarOpen={setCalendarOpen} />}
		</StyledHeader>
	);
};

export default Header;
