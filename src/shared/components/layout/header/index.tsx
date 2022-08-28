import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DateSelector from "./DateSelector";
import HeaderCalendar from "./HeaderCalendar";
import Icon from "../../Icon/Icons";
import { Share, StyledHeader } from "./headerStyle";

type Titles = {
	[key: string]: string;
	request: string;
	search: string;
};

const titles = {
	request: "이벤트 등록",
	search: "검색하기",
} as Titles;

type HeaderProps = {
	page: string;
	share?: boolean;
};

const Header = ({ page, share }: HeaderProps) => {
	const navigate = useNavigate();
	const [isCalendarOpen, setCalendarOpen] = useState(false);
	const mainPage = page === "main";

	return (
		<StyledHeader mainPage={mainPage}>
			<div id="header">
				{page === "search" || page === "request" ? (
					<Icon name="arrow-left" handleClick={() => navigate(-1)} />
				) : (
					<Icon name="logo" handleClick={() => navigate("/")} />
				)}

				{page && <h1>{titles[page]}</h1>}
				<div>
					{mainPage && <DateSelector isCalendarOpen={isCalendarOpen} setCalendarOpen={setCalendarOpen} />}
					{page === "main" || (page === "detail" && <Icon name="search" handleClick={() => navigate("/search")} />)}
					{share && (
						<Share>
							<Icon name="share" />
							<span className="tooltip">트위터에 공유하기</span>
						</Share>
					)}
				</div>
			</div>
			{isCalendarOpen && <HeaderCalendar setCalendarOpen={setCalendarOpen} />}
		</StyledHeader>
	);
};

Header.defaultProps = {
	share: false,
};

export default Header;
