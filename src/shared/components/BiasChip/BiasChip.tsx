import React from "react";
import { useQuery } from "react-query";
import { fetchBiases } from "../../../apis";
import { StyledBiasChip } from "./BiasChipStyle";

type BiasChipProps = {
	id: number;
};

const BiasChip = ({ id }: BiasChipProps) => {
	const { data: name } = useQuery(["bias", id], () => fetchBiases({ id }));

	return <StyledBiasChip>{name}</StyledBiasChip>;
};

export default BiasChip;
