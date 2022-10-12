import React from "react";
import { StyledGoodsChip } from "./goodsChipStyle";

type GoodsChipProps = {
  value: string;
};

const GoodsChip = ({ value }: GoodsChipProps) => <StyledGoodsChip>{value}</StyledGoodsChip>;

export default GoodsChip;
