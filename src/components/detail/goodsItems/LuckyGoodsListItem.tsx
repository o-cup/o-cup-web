import React from "react";
import { StyledGoodsListItem, StyledHighLightItem } from "../styles/goodsInfoStyle";
import GoodsChip from "../../../shared/components/GoodsChip";

type LuckyProps = {
  lucky: string[];
}
const LuckyGoodsListItem = ({ lucky }: LuckyProps) =>
  <StyledGoodsListItem>
    <h6>럭키드로우</h6>
    <ul className="lucky">
      {lucky.map((goods, i) =>
        <StyledHighLightItem key={`lucky${i + goods}`}>
          <p className="highlight">{i + 1}등</p>
          <div className="chipContainer">
            <GoodsChip value={goods} />
          </div>
        </StyledHighLightItem>,
      )}
    </ul>
  </StyledGoodsListItem>;

export default LuckyGoodsListItem;
