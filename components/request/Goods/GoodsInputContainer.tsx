import React from "react";
import { useRecoilState } from "recoil";
import { requestGoodsListAtom } from "../../../shared/state";
import GoodsInput from "./GoodsInput";
import { StyledGoodsContainer } from "./goodsInputStyle";
import type { ItemsType } from "../../../shared/types/request";

/*
 *  화면 표현을 위해
 *  [{ id: 1, key: "", title: "", items: [{ id: 1, text: "" }] }];
 *  requestGoodsListAtom에 저장 후
 *  데이터 전송 시 all, random, dDay, extra 분리
 * */
const GoodsInputContainer = () => {
	const [goodsList, setGoodsList] = useRecoilState(requestGoodsListAtom);

	const handleChangeGoods = (
		index: number,
		title: string,
		items: ItemsType[],
		key?: string
	) => {
		const goodsData = goodsList.map((g) => {
			if (g.id === index) {
				if (key !== undefined) {
					return { ...g, title, key, items };
				}
				return { ...g, title, items };
			}
			return g;
		});
		setGoodsList(goodsData);
	};

	const handleClickAddGoodsTitle = () => {
		setGoodsList([
			...goodsList,
			{
				id: (goodsList[goodsList.length - 1]?.id || 0) + 1,
				key: "",
				title: "",
				items: [{ id: 1, text: "" }],
			},
		]);
	};

	return (
		<StyledGoodsContainer>
			{goodsList.map((goodsObj) => (
				<GoodsInput
					key={goodsObj.id}
					value={goodsObj}
					handleChangeGoods={handleChangeGoods}
				/>
			))}
			<button type="button" onClick={handleClickAddGoodsTitle}>
				다른 특전 추가하기
			</button>
		</StyledGoodsContainer>
	);
};

export default GoodsInputContainer;
