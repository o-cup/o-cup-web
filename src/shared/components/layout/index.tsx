import React from "react";
import Header from "./header";
import Content from "./content";
import Footer from "./footer";
import { StyledLayout } from "./styles/layoutStyle";

type LayoutProps = {
	children: JSX.Element;
	title?: string;
};

/**
 * @param dateSelector header 에 년/월 선택하는 컴포넌트 유무
 *                     상세페이지에서도 동일 레이아웃 사용하기 위해 날짜 숨길 수 있도록 처리
 * @param children
 * */

const Layout: React.FC<LayoutProps> = ({ children, title }) => (
	<StyledLayout>
		<Header title={title} />
		<Content>{children}</Content>
		<Footer />
	</StyledLayout>
);

Layout.defaultProps = {
	title: "",
};

export default Layout;
