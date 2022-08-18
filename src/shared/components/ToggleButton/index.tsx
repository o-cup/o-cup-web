import React from "react";

type ToggleButtonProps = {
	width?: number;
	height?: number;
};

const ToggleButton = ({ width = 15, height = 8 }: ToggleButtonProps) => (
	<svg width={width} height={height} viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M7.07107 7.14236L14.1421 0.0712891H0L7.07107 7.14236Z" fill="black" />
	</svg>
);

ToggleButton.defaultProps = {
	width: null,
	height: null,
};

export default ToggleButton;
