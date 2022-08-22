import React from "react";
import { useRecoilState } from "recoil";
import { requestGoodsListAtom } from "../../state/atoms";
import { StyledGoodsContainer } from "./styles/goodsInputStyle";
import GoodsInput from "./GoodsInput";

type GoodsValues = {
  id: number;
  text: string;
};

const GoodsInputContainer = () => {
  const [goodsList, setGoodsList] = useRecoilState(requestGoodsListAtom);

  const handleChangeGoods = (title: string, items: GoodsValues[], index: number) => {
    const goodsData = goodsList.map((g) => {
      if (g.id === index) {
        return {
          ...g,
          title,
          items,
        };
      }
      return g;
    });
    setGoodsList(goodsData);
  };

  const handleClickAddGoodsTitle = () => {
    setGoodsList([
      ...goodsList,
      {
        id: goodsList[goodsList.length - 1].id + 1,
        title: "",
        items: [{ id: 1, text: "" }],
      },
    ]);
  };

  return (
    <StyledGoodsContainer>
      {goodsList.map((goodsObj) => (
        <GoodsInput key={goodsObj.id} value={goodsObj} handleChangeGoods={handleChangeGoods} />
      ))}
      <button type="button" onClick={handleClickAddGoodsTitle}>
        다른 특전 추가하기
      </button>
    </StyledGoodsContainer>
  )
};

export default GoodsInputContainer;