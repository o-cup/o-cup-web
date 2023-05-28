import React from "react";
import { useQuery } from "react-query";
import { fetchBiases } from "../../apis/common";
import { StyledBiasChip } from "./biasChipStyle";

type BiasChipProps = {
	id: number;
	previewName?: string;
	dots?: boolean;
	disabled?: boolean;
	text?: string;
};

const BiasChip = ({
	id,
	previewName,
	dots = false,
	disabled,
	text,
}: BiasChipProps) => {
	const { data: name } = useQuery(["bias", id], () => fetchBiases({ id }), {
		enabled: !!id || !!text,
	});

	return (
		<StyledBiasChip disabled={disabled || false}>
			{text || name || previewName || id}
			{dots && "..."}
		</StyledBiasChip>
	);
};

BiasChip.defaultProps = {
	previewName: "",
	dots: false,
	disabled: false,
	text: "",
};

export default BiasChip;
