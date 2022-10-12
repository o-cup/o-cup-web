import React from "react";
import { StyledContent } from "../layoutStyle";

type ContentProps = {
	children: JSX.Element;
};

const Content: React.FC<ContentProps> = ({ children }) => <StyledContent>{children}</StyledContent>;

export default Content;
