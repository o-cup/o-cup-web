import React from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { StyledLayout } from "../../styles/layoutStyle";

type LayoutProps = {
	children: JSX.Element;
};

const Layout: React.FC<LayoutProps> = ({ children }) => (
	<StyledLayout>
		<Header />
		<Content>{children}</Content>
		<Footer />
	</StyledLayout>
);

export default Layout;
