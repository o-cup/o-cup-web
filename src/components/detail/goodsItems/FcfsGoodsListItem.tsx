import React from "react";
import { FirstComeType } from "../../../types";
import { StyledGoodsListItem, StyledHighLightItem } from "../styles/goodsInfoStyle";
import GoodsChip from "../../../shared/components/GoodsChip";

type FcfsProps = {
	fcfs: FirstComeType;
};

const TYPE_C = { others: "기념일 제외", dDay: "기념일" };

const FcfsGoodsListItem = ({ fcfs }: FcfsProps) => {
	const { data } = fcfs;

	return (
		<StyledGoodsListItem>
			<p className="goods_title">선착 특전</p>
			<ul className="fcfs">
				{data
					.filter((d) => d.items.length > 0)
					.map((d) => {
						if (d.key === "others" || d.key === "dDay") {
							return (
								<StyledHighLightItem key={d.key}>
									<div className={`labelContainer length_${TYPE_C[d.key].length}`}>
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
