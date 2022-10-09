import React from "react";
import { EventType } from "../../../shared/types";
import FcfsGoodsListItem from "./goodsItems/FcfsGoodsListItem";
import GoodsListItem from "./goodsItems/GoodsListItem";
import ExtraGoodsListItem from "./goodsItems/ExtraGoodsListItem";
import LuckyGoodsListItem from "./goodsItems/LuckyGoodsListItem";
import { StyledGoodsInfo } from "./styles/goodsInfoStyle";

function GoodsInfo({ goods, tweetUrl }: Partial<EventType>) {
	return (
		<StyledGoodsInfo>
			<p className="title">특전</p>
			{goods?.firstCome && goods.firstCome.type && <FcfsGoodsListItem fcfs={goods.firstCome} />}
			{goods?.all && goods.all.length > 0 && <GoodsListItem title="all" items={goods.all} />}
			{goods?.random && goods.random.length > 0 && <GoodsListItem title="random" items={goods.random} />}
			{goods?.dDay && goods.dDay.length > 0 && <GoodsListItem title="dDay" items={goods.dDay} />}
			{goods?.extra?.map((item) => (
				<ExtraGoodsListItem goodsListItem={item} key={item.title} />
			))}
			{goods?.lucky && goods.lucky.length > 0 && <LuckyGoodsListItem lucky={goods.lucky} />}

			<p className="notice">
				상기 특전에 관한 내용은 실제와 다를 수 있으니 반드시 주최 측 포스터 및 트위터 공지를 확인하세요.
			</p>
			{tweetUrl && (
				<button className="tweetOpenBtn" type="button" onClick={() => tweetUrl && window.open(tweetUrl)}>
					특전 자세히 보기
				</button>
			)}
		</StyledGoodsInfo>
	);
}

export default GoodsInfo;
