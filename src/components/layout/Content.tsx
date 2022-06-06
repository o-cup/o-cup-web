import React from "react";

type ContentProps = {
	children: JSX.Element;
};

const Content: React.FC<ContentProps> = ({ children }) => <main>{children}</main>;

export default Content;
