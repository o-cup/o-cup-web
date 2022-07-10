import React from "react";
import { StyledGoodsInfo } from "../../styles";
import { DetailType } from "../../types";
import GoodsListItem from "./GoodsListItem";

function GoodsInfo({ goods }: Partial<DetailType>) {
	return (
		<StyledGoodsInfo>
			<h4>특전</h4>
			{goods?.map((item) => (
				<GoodsListItem goodsListItem={item} key={item.title} />
			))}
		</StyledGoodsInfo>
	);
}

export default GoodsInfo;
