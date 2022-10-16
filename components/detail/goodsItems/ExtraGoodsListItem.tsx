import React from "react";
import GoodsChip from "../../../shared/components/goodsChip";
import { StyledGoodsListItem } from "../styles/goodsInfoStyle";

const ExtraGoodsListItem = ({
	goodsListItem,
}: {
	goodsListItem: { title: string; items: string[] };
}) => {
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
