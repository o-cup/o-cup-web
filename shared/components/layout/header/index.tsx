import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
	description?: string;
};

const Header = ({ page, share, handleBackClick, description }: HeaderProps) => {
	const router = useRouter();
	const { pathname } = router;
	const setDateFilter = useSetRecoilState(dateFilterAtom);
	const searchFilters = useRecoilValue(searchFiltersAtom);
	const { searchType, bid, placeName } = searchFilters;
	const isSearchResultOpened = useRecoilValue(showResultAtom);
	const [isCalendarOpen, setCalendarOpen] = useState(false);
	const [isTooltipOpen, setIsTooltipOpen] = useState(true);
	const [isToastOpen, setIsToastOpen] = useState(false);
	const mainPage = page === "main";

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
		const currentUrl = window.document.location.href;
		window.open(
			`https://twitter.com/intent/tweet?text=${description}&url=${currentUrl}`,
			"popup",
			"width=600, height=360"
		);
	};

	const handleShareClick = () => {
		const isSearchResultShare =
			pathname.includes("search") && isSearchResultOpened;

		if (isSearchResultShare) {
			const baseUrl = `${window.origin}/search`;
			let url = "";

			switch (searchType) {
				case "bias":
					url = `${baseUrl}?type=${searchType}&bid=${bid}`;
					break;

				case "place":
					url = `${baseUrl}?type=${searchType}&name=${encodeURIComponent(
						placeName
					)}`;
					break;

				default:
					break;
			}

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
						<Icon name="back" handleClick={handleBackClick || goBack} />
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
	description: "",
};

export default Header;
