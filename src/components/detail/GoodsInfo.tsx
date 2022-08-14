import React from "react";
import { DetailType } from "../../types";
import GoodsListItem from "./GoodsListItem";
import { StyledGoodsInfo } from "./styles/goodsInfoStyle";

function GoodsInfo({ goods, tweetUrl }: Partial<DetailType>) {
	return (
		<StyledGoodsInfo>
			<h4>특전</h4>
			{goods?.map((item) => (
				<GoodsListItem goodsListItem={item} key={item.title} />
			))}
			<p className="notice">수량 등 특전에 관한 자세한 사항은 포스터 내 공지를 확인하세요.</p>
			<button className="tweetOpenBtn" type="button" onClick={() => tweetUrl && window.open(tweetUrl)}>
				특전 자세히 보기
			</button>
		</StyledGoodsInfo>
	);
}

export default GoodsInfo;
