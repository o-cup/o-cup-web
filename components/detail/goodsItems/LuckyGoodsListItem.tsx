import React from "react";
import {
	StyledGoodsListItem,
	StyledHighLightItem,
} from "../styles/goodsInfoStyle";
import GoodsChip from "../../../shared/components/goodsChip";

type LuckyProps = {
	lucky: string[];
};
const LuckyGoodsListItem = ({ lucky }: LuckyProps) => (
	<StyledGoodsListItem>
		<p className="goods_title">럭키드로우</p>
		<ul className="lucky">
			{lucky.map((goods, i) => (
				<StyledHighLightItem key={`lucky${i + goods}`}>
					{lucky.length > 1 && (
						<div className="labelContainer length_2">
							<p className="highlight">{i + 1}등</p>
						</div>
					)}
					<div className="chipContainer">
						<GoodsChip value={goods} />
					</div>
				</StyledHighLightItem>
			))}
		</ul>
	</StyledGoodsListItem>
);

export default LuckyGoodsListItem;