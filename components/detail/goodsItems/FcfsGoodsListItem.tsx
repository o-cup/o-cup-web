import React from "react";
import GoodsChip from "../../../shared/components/goodsChip";
import {
	StyledGoodsListItem,
	StyledHighLightItem,
} from "../styles/goodsInfoStyle";
import type { FirstComeType } from "../../../shared/types";

type FcfsProps = {
	fcfs: FirstComeType;
};

const TYPE_C = { dDay: "기념일", others: "기념일 제외" };

const FcfsGoodsListItem = ({ fcfs }: FcfsProps) => {
	const { data } = fcfs;

	return (
		<StyledGoodsListItem>
			<p className="goods_title">선착 특전</p>
			<ul className="fcfs">
				{data
					.filter((d) => d.items.length > 0)
					.map((d) => {
						if (d.key === "dDay" || d.key === "others") {
							return (
								<StyledHighLightItem key={d.key} className={d.key}>
									<div
										className={`labelContainer length_${TYPE_C[d.key].length}`}
									>
										<p className="highlight">{TYPE_C[d.key]}</p>
									</div>
									<div className="chipContainer">
										{d.items.map((item) => (
											<GoodsChip key={item} value={item} />
										))}
									</div>
								</StyledHighLightItem>
							);
						}
						if (d.day) {
							return (
								<StyledHighLightItem key={d.day}>
									<div className="labelContainer length_2">
										<p className="highlight">{d.day}일</p>
									</div>
									<div className="chipContainer">
										{d.items.map((item) => (
											<GoodsChip key={item} value={item} />
										))}
									</div>
								</StyledHighLightItem>
							);
						}
						return (
							<StyledHighLightItem key="typeA">
								<div className="labelContainer length_2">
									<p className="highlight">매일</p>
								</div>
								<div className="chipContainer">
									{d.items.map((item) => (
										<GoodsChip key={item} value={item} />
									))}
								</div>
							</StyledHighLightItem>
						);
					})}
			</ul>
		</StyledGoodsListItem>
	);
};

export default FcfsGoodsListItem;
