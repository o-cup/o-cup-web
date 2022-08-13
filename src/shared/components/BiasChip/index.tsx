import React from "react";
import { useQuery } from "react-query";
import { fetchBiases } from "../../../apis";
import { StyledBiasChip } from "./biasChipStyle";

type BiasChipProps = {
	id: number;
  dots?: boolean;
};

const BiasChip = ({ id, dots = false }: BiasChipProps) => {
	const { data: name } = useQuery(["bias", id], () => fetchBiases({ id }), { enabled: !!id });

	return <StyledBiasChip>{name || id}{dots && "..."}</StyledBiasChip>;
};

BiasChip.defaultProps = {
	dots: false
}

export default BiasChip;
