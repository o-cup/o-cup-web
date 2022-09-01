import React from "react";
import { FirstComeType } from "../../../types";
import { StyledGoodsListItem, StyledHighLightItem } from "../styles/goodsInfoStyle";
import GoodsChip from "../../../shared/components/GoodsChip";

type FcfsProps = {
  fcfs: FirstComeType
};

const TYPE_C = { others: "매일", dDay: "기념일" };

const FcfsGoodsListItem = ({ fcfs }: FcfsProps) => {

  const { data } = fcfs;

  return (
    <StyledGoodsListItem>
      <h6>선착특전</h6>
      <ul className="fcfs">
        {data.filter(d => d.items.length > 0).map((d) => {
            if (d.key === "others" || d.key === "dDay") {
              return (
                <StyledHighLightItem key={d.key}>
                  <p className="highlight">{TYPE_C[d.key]}</p>
                  <div className="chipContainer">
                    {d.items.map((item) => <GoodsChip key={item} value={item} />)}
                  </div>
                </StyledHighLightItem>
              );
            }
            if (d.day) {
              return (
                <StyledHighLightItem key={d.day}>
                  <p className="highlight">{d.day}일</p>
                  <div className="chipContainer">
                    {d.items.map((item) => <GoodsChip key={item} value={item} />)}
                  </div>
                </StyledHighLightItem>
              );
            }
            return (
              <StyledHighLightItem key="typeA">
                <p className="highlight">매일</p>
                <div className="chipContainer">
                  {d.items.map((item) => <GoodsChip key={item} value={item} />)}
                </div>
              </StyledHighLightItem>
            );
          },
        )}
      </ul>
    </StyledGoodsListItem>
  );
};

export default FcfsGoodsListItem;
