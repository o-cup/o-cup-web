import React from "react";
import { StyledContent } from "../styles/layoutStyle";

type ContentProps = {
	children: JSX.Element;
};

const Content: React.FC<ContentProps> = ({ children }) => <StyledContent>{children}</StyledContent>;

export default Content;
