import React from "react";
import { StyledGoodsInfo } from "../../styles";
import { DetailType } from "../../types";
import GoodsListItem from "./GoodsListItem";

function GoodsInfo({ goods }: Partial<DetailType>) {
	return (
		<StyledGoodsInfo>
			<h4>특전</h4>
			{goods?.map((item) => (
				<GoodsListItem goodsListItem={item} key={item.title} />
			))}
			<p>수량 등 특전에 관한 자세한 사항은 포스터 내 공지를 확인하세요.</p>
			<button type="button">특전 자세히 보기</button>
		</StyledGoodsInfo>
	);
}

export default GoodsInfo;