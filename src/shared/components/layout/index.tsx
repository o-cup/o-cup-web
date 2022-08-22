import React from "react";
import Header from "./header";
import Content from "./content";
import Footer from "./footer";
import { StyledLayout } from "./styles/layoutStyle";

type LayoutProps = {
	children: JSX.Element;
	page: string;
	share?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ children, page, share }) => (
	<StyledLayout>
		<Header page={page} share={share} />
		<Content>{children}</Content>
		<Footer />
	</StyledLayout>
);

Layout.defaultProps = {
	share: false,
};

export default Layout;
