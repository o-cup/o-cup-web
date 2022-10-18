import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { requestGoodsListAtom } from "../../../shared/state";
import GoodsInput from "./GoodsInput";
import { StyledGoodsContainer, StyledGoodsTitle } from "./goodsInputStyle";
import type { ItemsType } from "../../../shared/types/request";
import { Icon } from "../../../shared/components";

/*
 *  화면 표현을 위해
 *  [{ id: 1, key: "", title: "", items: [{ id: 1, text: "" }] }];
 *  requestGoodsListAtom에 저장 후
 *  데이터 전송 시 all, random, dDay, extra 분리
 * */
const GoodsInputContainer = () => {
	const [hasGoods, setHasGoods] = useState(true);
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

	const handleClickHasGoods = () => {
		if (hasGoods) {
			// 특전 없음 클릭 시 입력했던 특전 정보 초기화
			setGoodsList([
				{ id: 1, key: "", title: "", items: [{ id: 1, text: "" }] },
			]);
		}
		setHasGoods(!hasGoods);
	};

	return (
		<StyledGoodsContainer>
			<StyledGoodsTitle>
				<span className="label">특전</span>
				<div className={`checkOpen ${hasGoods ? "selected" : "notSelected"}`}>
					<button type="button" onClick={handleClickHasGoods}>
						{hasGoods ? (
							<Icon name="check_false" />
						) : (
							<Icon name="check_true" />
						)}
						특전 없음
					</button>
				</div>
			</StyledGoodsTitle>
			{hasGoods && (
				<>
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
				</>
			)}
		</StyledGoodsContainer>
	);
};

export default GoodsInputContainer;
