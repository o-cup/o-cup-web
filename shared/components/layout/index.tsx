import Script from "next/script";
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
		{(page === "detail" || page === "request" || page === "duplicate") && (
			<>
				<Script
					id="kakaoMap"
					src="//dapi.kakao.com/v2/maps/sdk.js?appkey=aa90b5cd8734fb0ed66e4f3aab95a147&autoload=false&libraries=services"
				/>
				<Script
					id="kakaoJS"
					type="text/javascript"
					src="https://developers.kakao.com/sdk/js/kakao.js"
				/>
			</>
		)}
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
