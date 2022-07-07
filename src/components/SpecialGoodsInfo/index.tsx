import React from "react";
import {StyledSpecialGoodsInfo} from "../../styles/specialGoodsInfoStyle";
import GoodsList from "./GoodsList";

function SpecialGoodsInfo() {
    return (
        <StyledSpecialGoodsInfo>
            <h4>특전</h4>

            <GoodsList title="전체특전"
                       goods={["컵홀더", "포토매틱", "띠부씰 2종"]}
                       type="AND"/>
            <GoodsList title="선착특전"
                       goods={["맥주컵", "수건", "티켓", "키링"]}
                       type="OR"/>
            <GoodsList title="스페셜메뉴 특전"
                       goods={["기본특전", "예절포카", "부적포카", "포토매틱"]}
                       type="AND"/>

            <p>수량 등 특전에 관한 자세한 사항은 포스터 내 공지를 확인하세요.</p>

            <button type="button">특전 자세히 보기</button>
        </StyledSpecialGoodsInfo>
    )
}

export default SpecialGoodsInfo;