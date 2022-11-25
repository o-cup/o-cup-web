import React from "react";
import Content from "./content";
import Footer from "./footer";
import Header from "./header";
import { StyledLayout } from "./layoutStyle";

type LayoutProps = {
	children: JSX.Element;
	page: string;
	share?: boolean;
	handleBackClick?: () => void;
};

const Layout: React.FC<LayoutProps> = ({
	children,
	page,
	share,
	handleBackClick,
}) => (
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
