import React from "react";
import { StyledGoodsListItem } from "../styles/goodsInfoStyle";
import GoodsChip from "../../../shared/components/GoodsChip";

const ExtraGoodsListItem = ({ goodsListItem }: { goodsListItem: { title: string; items: string[] } }) => {
	const { title, items } = goodsListItem;

	return (
		<StyledGoodsListItem>
			<p className="goods_title">{title}</p>
			<ul className="extra">
				{items.map((item) => (
					<li key={item}>
						<GoodsChip value={item} />
					</li>
				))}
			</ul>
		</StyledGoodsListItem>
	);
};

export default ExtraGoodsListItem;
