import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
	dateFilterAtom,
	showResultAtom,
	searchFiltersAtom,
} from "../../../state";
import { convertDateToString, copyToClipboard } from "../../../utils";
import Icon from "../../icon";
import Toast from "../../toast";
import DateSelector from "./DateSelector";
import HeaderCalendar from "./headerCalendar";
import { Share, StyledHeader } from "./style";

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
	const router = useRouter();
	const { pathname } = router;
	const setDateFilter = useSetRecoilState(dateFilterAtom);
	const searchFilters = useRecoilValue(searchFiltersAtom);
	const { keyword } = searchFilters;
	const isSearchResultOpened = useRecoilValue(showResultAtom);
	const [isCalendarOpen, setCalendarOpen] = useState(false);
	const [isTooltipOpen, setIsTooltipOpen] = useState(true);
	const [isToastOpen, setIsToastOpen] = useState(false);
	const urlRef = useRef<null | string>("https://www.o-cup.kr");

	const mainPage = page === "main";

	useEffect(() => {
		if (typeof window !== "undefined") {
			urlRef.current = `${window.origin}${router.asPath}`;
		}
	}, []);

	useEffect(() => {
		const hideTooltip = page === "search" && isSearchResultOpened;
		setIsTooltipOpen(!hideTooltip);
	}, [page, isSearchResultOpened, setIsTooltipOpen]);

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
		const sendText =
			document
				?.querySelector("meta[name='twitter:description']")
				?.getAttribute("content") || "오늘의 컵홀더";
		window.open(
			`https://twitter.com/intent/tweet?text=${sendText}&url=${urlRef.current}`,
			"popup",
			"width=600, height=360"
		);
	};

	const handleShareClick = () => {
		const isSearchResultShare =
			pathname.includes("search") && isSearchResultOpened;
		if (isSearchResultShare) {
			const encodedKeyword = encodeURIComponent(keyword);
			const url = `${urlRef.current}?keyword=${encodedKeyword}`;
			copyToClipboard(url);
			setIsToastOpen(true);
			return;
		}

		shareTwitter();
	};

	const handleLogoClick = () => {
		const today = new Date();
		setDateFilter(convertDateToString(today));
		router.push("/");
		window.scrollTo({ top: 0 });
	};

	const goBack = () => {
		router.back();

		// if (window.history.state && window.history.state?.idx > 0) {
		// 	router.back();
		// } else {
		// 	router.push("/");
		// }
	};

	const renderTooltip = () => {
		if (!isTooltipOpen) return null;

		const searchResult = page === "search" && isSearchResultOpened;
		if (searchResult) return null;

		return <span className="tooltip">트위터에 공유하기</span>;
	};

	return (
		<>
			<StyledHeader mainPage={mainPage}>
				<div id="header">
					{page !== "main" ? (
						<Icon name="arrow-left" handleClick={handleBackClick || goBack} />
					) : (
						<Icon name="logo" handleClick={handleLogoClick} />
					)}

					{page && <h1>{titles[page]}</h1>}
					<div className="rightIcons">
						{mainPage && (
							<DateSelector
								isCalendarOpen={isCalendarOpen}
								setCalendarOpen={setCalendarOpen}
							/>
						)}
						{(mainPage || page === "detail") && (
							<Icon
								name="search_header"
								handleClick={() => router.push("/search")}
							/>
						)}
						{share && (
							<Share>
								<Icon name="share" handleClick={handleShareClick} />
								{isTooltipOpen && (
									<span className="tooltip">트위터에 공유하기</span>
								)}
								{renderTooltip()}
							</Share>
						)}
					</div>
				</div>
				{isToastOpen && (
					<Toast setToast={setIsToastOpen} text="링크가 복사되었습니다" />
				)}
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