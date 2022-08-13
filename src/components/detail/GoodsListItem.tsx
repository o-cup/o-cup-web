import React from "react";
import { GoodsItemType } from "../../types";
import { Chip, StyledGoodsListItem } from "./styles/goodsInfoStyle";

const GoodsListItem = ({ goodsListItem }: { goodsListItem: GoodsItemType }) => {
	const { title, items, type } = goodsListItem;

	return (
		<StyledGoodsListItem type={type}>
			<h6>{title}</h6>
			<ul>
				{items.map((item) => (
					<li key={item}>
						<Chip key={item}>{item}</Chip>
					</li>
				))}
			</ul>
		</StyledGoodsListItem>
	);
};

export default GoodsListItem;
