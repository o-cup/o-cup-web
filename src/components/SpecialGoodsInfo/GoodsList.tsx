import React from "react";
import {
    StyledGoodsList,
    StyledGoodsListAND,
    StyledGoodsListOR,
    StyledGoodsChip
} from "../../styles/specialGoodsInfoStyle";

type GoodsListProps = {
    title: string;
    goods: Array<string>;
    type: string; // "AND" || "OR"
};

/**
 * @param title 특전 제목(e.g. "선착특전")
 * @param goods 특전 목록 배열
 * @param type  특전 목록 표현 타입(<StyledGoodsChip/>을 + 혹은 |로 나열)
 * */
function GoodsList({title, goods, type}: GoodsListProps) {
    return (
        <StyledGoodsList>
            <h6>{title}</h6>
            {type === "AND"
                ? <StyledGoodsListAND>
                    {goods.map((ele: string) => <li key={ele}>
                        <StyledGoodsChip>{ele}</StyledGoodsChip>
                    </li>)}
                </StyledGoodsListAND>
                : <StyledGoodsListOR>
                    {goods.map((ele: string) => <li key={ele}>
                        <StyledGoodsChip>{ele}</StyledGoodsChip>
                    </li>)}
                </StyledGoodsListOR>}

        </StyledGoodsList>
    )
}

export default GoodsList;