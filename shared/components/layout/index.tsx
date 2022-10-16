import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Content from "./content";
import Footer from "./footer";
import Header from "./header";
import { StyledLayout } from "./layoutStyle";

type LayoutProps = {
	description?: string;
	children: JSX.Element;
	page: string;
	share?: boolean;
	handleBackClick?: () => void;
};

type HeadContentsType = {
	[key: string]: {
		title: string;
		description?: string;
	};
};

const defaultTitle = "오늘의 컵홀더";

const headContents = {
	"/": {
		title: defaultTitle,
		description: "응원하는 아티스의 생일 이벤트를 한눈에 확인해보세요!",
	},
	"/detail/[eid]": {
		title: `${defaultTitle} | 상세보기`,
	},
	"/request": {
		title: `${defaultTitle} | 등록하기`,
	},
	"/search": {
		title: `${defaultTitle} | 검색하기`,
		description: "응원하는 아티스트의 생일 이벤트를 검색해보세요!",
	},
} as HeadContentsType;

const Layout: React.FC<LayoutProps> = ({
	description,
	children,
	page,
	share,
	handleBackClick,
}) => {
	const router = useRouter();
	const { pathname } = router;

	return (
		<StyledLayout>
			<Head>
				<meta
					name="description"
					content={description || headContents[pathname].description}
				/>

				<meta property="og:type" content="website" />
				<meta property="og:title" content="페이지 제목" />
				<meta property="og:description" content="페이지 설명" />
				<meta
					property="og:image"
					content="https://www.o-cup.kr/images/ocup_profile.jpg"
				/>
				<meta property="og:url" content="o-cup.kr" />

				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content={defaultTitle} />
				<meta
					name="twitter:description"
					content={description || headContents[pathname].description}
				/>
				<meta
					name="twitter:image"
					content="https://www.o-cup.kr/images/ocup_profile.jpg"
				/>
				<meta name="twitter:site" content="o-cup.kr" />

				<title>{headContents[pathname].title}</title>
			</Head>
			<Header
				page={page}
				share={share}
				handleBackClick={handleBackClick}
				description={description}
			/>
			<Content>{children}</Content>
			<Footer />
		</StyledLayout>
	);
};

Layout.defaultProps = {
	share: false,
	handleBackClick: undefined,
	description: "",
};

export default Layout;
