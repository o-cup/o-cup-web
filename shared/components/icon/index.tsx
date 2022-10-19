import React from "react";
import { StyledIcon } from "./IconStyle";

type IconProps = {
	name: string;
	handleClick?: () => void;
};

const Icon = ({ name, handleClick }: IconProps) => <StyledIcon className={name} onClick={handleClick} />;

Icon.defaultProps = {
	handleClick: null,
};

export default Icon;
