import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { dateFilterAtom } from "../../../../state/atoms";
import DateSelector from "./DateSelector";
import Icon from "../../Icon/Icons";
import HeaderCalendar from "./HeaderCalendar";
import { Share, StyledHeader } from "./headerStyle";
import { convertDateToString } from "../../../utils/dateHandlers";

type Titles = {
	[key: string]: string;
	request: string;
	search: string;
};

const titles = {
	detail: "상세보기",
	duplicate: "이벤트 중복확인",
	request: "이벤트 등록",
	search: "검색하기",
} as Titles;

type HeaderProps = {
	page: string;
	share?: boolean;
	handleBackClick?: () => void;
};

const Header = ({ page, share, handleBackClick }: HeaderProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	const [, setDateFilter] = useRecoilState(dateFilterAtom);

	const [isCalendarOpen, setCalendarOpen] = useState(false);
	const [isTooltipOpen, setIsTooltipOpen] = useState(true);
	const mainPage = page === "main";

	useEffect(() => {
		const handleScroll = () => {
			setIsTooltipOpen(false);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const shareTwitter = () => {
		const sendText = "오늘의 컵홀더"; // 전달할 텍스트
		const sendUrl = `${window.origin}${location.pathname}`; // 전달할 URL
		window.open(`https://twitter.com/intent/tweet?text=${sendText}&url=${sendUrl}`, "popup", "width=600, height=360");
	};

	const handleLogoClick = () => {
		const today = new Date();
		setDateFilter(convertDateToString(today));
		navigate("/");
		window.scrollTo({ top: 0 });
	};

	return (
		<>
			<StyledHeader mainPage={mainPage}>
				<div id="header">
					{page !== "main" ? (
						<Icon name="arrow-left" handleClick={handleBackClick || (() => navigate(-1))} />
					) : (
						<Icon name="logo" handleClick={handleLogoClick} />
					)}

					{page && <h1>{titles[page]}</h1>}
					<div className="rightIcons">
						{mainPage && <DateSelector isCalendarOpen={isCalendarOpen} setCalendarOpen={setCalendarOpen} />}
						{(mainPage || page === "detail") && <Icon name="search_header" handleClick={() => navigate("/search")} />}
						{share && (
							<Share>
								<Icon name="share" handleClick={shareTwitter} />
								{isTooltipOpen && <span className="tooltip">트위터에 공유하기</span>}
							</Share>
						)}
					</div>
				</div>
			</StyledHeader>
			{isCalendarOpen && <HeaderCalendar setCalendarOpen={setCalendarOpen} />}
		</>
	);
};

Header.defaultProps = {
	share: false,
	handleBackClick: null,
};

export default Header;
