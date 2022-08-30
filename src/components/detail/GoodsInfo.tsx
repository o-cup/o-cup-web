import React from "react";
import { DetailType } from "../../types";
import FcfsGoodsListItem from "./goodsItems/FcfsGoodsListItem";
import GoodsListItem from "./goodsItems/GoodsListItem";
import ExtraGoodsListItem from "./goodsItems/ExtraGoodsListItem";
import LuckyGoodsListItem from "./goodsItems/LuckyGoodsListItem";
import { StyledGoodsInfo } from "./styles/goodsInfoStyle";

function GoodsInfo({ goods, tweetUrl }: Partial<DetailType>) {
	return (
		<StyledGoodsInfo>
			<h4>특전</h4>
			{goods?.firstCome && <FcfsGoodsListItem fcfs={goods.firstCome}/>}
			{goods?.all && <GoodsListItem title="all" items={goods.all}/>}
			{goods?.random && <GoodsListItem title="random" items={goods.random}/>}
			{goods?.dDay && <GoodsListItem title="dDay" items={goods.dDay}/>}
			{goods?.extra?.map((item) => (
				<ExtraGoodsListItem goodsListItem={item} key={item.title} />
			))}
			{goods?.lucky && <LuckyGoodsListItem lucky={goods.lucky}/>}

			<p className="notice">
				상기 특전에 관한 내용은 실제와 다를 수 있으니 반드시 주최 측 포스터 및 트위터 공지를 확인하세요.
			</p>
			{tweetUrl && <button className="tweetOpenBtn" type="button" onClick={() => tweetUrl && window.open(tweetUrl)}>
				특전 자세히 보기
			</button>}
		</StyledGoodsInfo>
	);
}

export default GoodsInfo;
