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
		<h6>{TYPE[title]}</h6>
		<ul>
			{items.map((item) => (
				<li key={item}>
					<GoodsChip key={item} value={item} />
				</li>
			))}
		</ul>
	</StyledGoodsListItem>
);

export default GoodsListItem;
