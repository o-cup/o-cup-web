import React from "react";
import { useQuery } from "react-query";
import { fetchBiases } from "../../../apis";
import { StyledBiasChip } from "./biasChipStyle";

type BiasChipProps = {
	id: number;
	previewName?: string;
	dots?: boolean;
};

const BiasChip = ({ id, previewName, dots = false }: BiasChipProps) => {
	const { data: name } = useQuery(["bias", id], () => fetchBiases({ id }), { enabled: !!id });

	return (
		<StyledBiasChip>
			{name || previewName || id}
			{dots && "..."}
		</StyledBiasChip>
	);
};

BiasChip.defaultProps = {
	previewName: "",
	dots: false,
};

export default BiasChip;
