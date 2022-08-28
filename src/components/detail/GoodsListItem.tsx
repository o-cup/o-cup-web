import React from "react";
import { StyledGoodsListItem } from "./styles/goodsInfoStyle";
import GoodsChip from "../../shared/components/GoodsChip";

const GoodsListItem = ({ goodsListItem }: { goodsListItem: { title: string; items: string[]; }}) => {
	const { title, items } = goodsListItem;

	return (
		<StyledGoodsListItem>
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
