import React from "react";
import { GoodsItemType } from "../../types";
import { StyledGoodsListItem } from "./styles/goodsInfoStyle";
import GoodsChip from "../../shared/components/GoodsChip";

const GoodsListItem = ({ goodsListItem }: { goodsListItem: GoodsItemType }) => {
	const { title, items, type } = goodsListItem;

	return (
		<StyledGoodsListItem type={type || "AND"}>
			<h6>{title}</h6>
			<ul>
				{items.map((item) => (
					<li key={item}>
						<GoodsChip key={item} value={item}/>
					</li>
				))}
			</ul>
		</StyledGoodsListItem>
	);
};

export default GoodsListItem;
