import React from "react";
import Icon from "../icon";
import { StyledChip } from "./chipStyle";
import type { CustomStyleType, ColorsType } from "../../types";

type ChipProps = {
	text: string;
	customStyle?: CustomStyleType;
	bgColor?: ColorsType;
	handleDelete?: () => void;
};

const Chip = ({
	text,
	customStyle,
	bgColor = "white",
	handleDelete,
}: ChipProps) => (
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
