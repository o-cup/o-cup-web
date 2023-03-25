import React from "react";
import ExtraGoodsListItem from "../detail/goodsItems/ExtraGoodsListItem";
import FcfsGoodsListItem from "../detail/goodsItems/FcfsGoodsListItem";
import GoodsListItem from "../detail/goodsItems/GoodsListItem";
import LuckyGoodsListItem from "../detail/goodsItems/LuckyGoodsListItem";
import { StyledGoodsInfo } from "../detail/styles/goodsInfoStyle";
import type { EventType } from "../../shared/types";

function PreviewGoodsInfo({ goods }: Partial<EventType>) {
	const hasGoods = () => {
		let result = false;
		if (goods) {
			if (
				(goods.all && goods.all?.length > 0) ||
				(goods.random && goods.random?.length > 0) ||
				(goods.dDay && goods.dDay?.length > 0) ||
				(goods.extra && goods.extra?.length > 0) ||
				(goods.lucky && goods.lucky?.length > 0) ||
				(goods.firstCome?.type && goods.firstCome?.data.length > 0)
			) {
				result = true;
			}
		}
		return result;
	};

	if (!hasGoods()) {
		return null;
	}
	return (
		<StyledGoodsInfo>
			<p className="title">특전</p>
			{goods?.firstCome && goods.firstCome.type && (
				<FcfsGoodsListItem fcfs={goods.firstCome} />
			)}
			{goods?.all && goods.all.length > 0 && (
				<GoodsListItem title="all" items={goods.all} />
			)}
			{goods?.random && goods.random.length > 0 && (
				<GoodsListItem title="random" items={goods.random} />
			)}
			{goods?.dDay && goods.dDay.length > 0 && (
				<GoodsListItem title="dDay" items={goods.dDay} />
			)}
			{goods?.extra?.map((item) => (
				<ExtraGoodsListItem goodsListItem={item} key={item.title} />
			))}
			{goods?.lucky && goods.lucky.length > 0 && (
				<LuckyGoodsListItem lucky={goods.lucky} />
			)}

			<p className="notice">
				상기 특전에 관한 내용은 실제와 다를 수 있으니 반드시 주최 측 포스터 및
				공지를 확인하세요.
			</p>
		</StyledGoodsInfo>
	);
}

export default PreviewGoodsInfo;
