import React from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import {StyledLayout} from "../../styles/layoutStyle";

type LayoutProps = {
    dateSelector?: boolean;
    children: JSX.Element;
};

/**
 * @param dateSelector header 에 년/월 선택하는 컴포넌트 유무
 *                     상세페이지에서도 동일 레이아웃 사용하기 위해 날짜 숨길 수 있도록 처리
 * @param children
 * */

const Layout: React.FC<LayoutProps> = ({dateSelector, children}) => (
    <StyledLayout>
        <Header dateSelector={dateSelector || false}/>
        <Content>{children}</Content>
        <Footer/>
    </StyledLayout>
);

Layout.defaultProps = {
    dateSelector: false
}

export default Layout;
