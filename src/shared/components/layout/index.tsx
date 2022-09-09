import React from "react";
import Header from "./header";
import Content from "./content";
import Footer from "./footer";
import { StyledLayout } from "./styles/layoutStyle";

type LayoutProps = {
	children: JSX.Element;
	page: string;
	share?: boolean;
	handleBackClick?: () => void;
};

const Layout: React.FC<LayoutProps> = ({ children, page, share, handleBackClick }) => (
	<StyledLayout>
		<Header page={page} share={share} handleBackClick={handleBackClick} />
		<Content>{children}</Content>
		<Footer />
	</StyledLayout>
);

Layout.defaultProps = {
	share: false,
	handleBackClick: undefined,
};

export default Layout;
