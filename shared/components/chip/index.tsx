import React from "react";
import { ColorsType, CustomStyleType } from "../../../types";
import Icon from "../Icon/Icons";
import { StyledChip } from "./chipStyle";

type ChipProps = {
	text: string;
	customStyle?: CustomStyleType;
	bgColor?: ColorsType;
	handleDelete?: () => void;
};

const Chip = ({ text, customStyle, bgColor = "white", handleDelete }: ChipProps) => (
	<StyledChip customStyle={customStyle} bgColor={bgColor}>
		{text}
		{handleDelete && <Icon name="delete" handleClick={handleDelete} />}
	</StyledChip>
);

Chip.defaultProps = {
	customStyle: {},
	bgColor: "",
	handleDelete: null,
};

export default Chip;
