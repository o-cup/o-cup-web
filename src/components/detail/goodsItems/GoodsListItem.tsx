import React from "react";
import { StyledGoodsListItem } from "../styles/goodsInfoStyle";
import GoodsChip from "../../../shared/components/GoodsChip";

type GoodsProps = {
	title: "all" | "random" | "dDay";
	items: string[];
};

const TYPE = { all: "전체특전", random: "랜덤특전", dDay: "기념일특전" };

const GoodsListItem = ({ title, items }: GoodsProps) => (
	<StyledGoodsListItem>
		<p className="goods_title">{TYPE[title]}</p>
		<ul className="default">
			{items.map((item) => (
				<li key={item}>
					<GoodsChip value={item} />
				</li>
			))}
		</ul>
	</StyledGoodsListItem>
);

export default GoodsListItem;
