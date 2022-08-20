import React from "react";
import Header from "./header";
import Content from "./content";
import Footer from "./footer";
import { StyledLayout } from "./styles/layoutStyle";

type LayoutProps = {
	children: JSX.Element;
	page: string;
};

const Layout: React.FC<LayoutProps> = ({ children, page }) => (
	<StyledLayout>
		<Header page={page} />
		<Content>{children}</Content>
		<Footer />
	</StyledLayout>
);

export default Layout;
