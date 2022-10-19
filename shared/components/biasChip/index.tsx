import React from "react";
import { useQuery } from "react-query";
import { fetchBiases } from "../../apis/common";
import { StyledBiasChip } from "./biasChipStyle";

type BiasChipProps = {
	id: number;
	previewName?: string;
	dots?: boolean;
	disabled?: boolean;
};

const BiasChip = ({
	id,
	previewName,
	dots = false,
	disabled,
}: BiasChipProps) => {
	const { data: name } = useQuery(["bias", id], () => fetchBiases({ id }), {
		enabled: !!id,
	});

	return (
		<StyledBiasChip disabled={disabled || false}>
			{name || previewName || id}
			{dots && "..."}
		</StyledBiasChip>
	);
};

BiasChip.defaultProps = {
	previewName: "",
	dots: false,
	disabled: false,
};

export default BiasChip;
