import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  StyledLuckyInput,
  StyledLuckyTitle,
  StyledLuckyContentContainer,
} from "./luckyInputStyle";
import Icons from "../../../shared/components/Icon/Icons";
import { ItemsType } from "../requestType";
import EditableGoodsChip from "../../../shared/components/EditableGoodsChip";
import Icon from "../../../shared/components/Icon/Icons";

const LuckyDrawInput = () => {

  const [hasLucky, setHasLucky] = useState(true);
  const [luckyList, setLuckyList] = useState([{ id: 1, text: "" }, { id: 2, text: "" }] as ItemsType[]);

  const handleAddLuck = () => {
    setLuckyList([
      ...luckyList,
      { id: luckyList.length + 1, text: "" },
    ]);
  };

  const handleDeleteLuck = () => {
    const popLuck = luckyList.slice();
    popLuck.pop();
    setLuckyList(popLuck);
  };

  return (
    <StyledLuckyInput>
      <StyledLuckyTitle>
        <span className="label">럭키드로우</span>
        <div className="hasLucky">
          <button type="button" onClick={() => setHasLucky(!hasLucky)}>
            {hasLucky ? <Icons name="check_false" /> : <Icons name="check_true" />}
            럭키드로우 없음
          </button>
        </div>
      </StyledLuckyTitle>

      <div className={hasLucky ? "" : "noLuck"}>
        {luckyList.map((luck) =>
          <StyledLuckyContentContainer key={luck.id}>
            <div className="highlight">{luck.id}등</div>
            <div className="chipContainer">
              <EditableGoodsChip index={luck.id} value={luck.text}
                                 handleChange={(e) => console.log(e)}
                                 handleDelete={() => console.log("delete")} />
            </div>
            {luck.id !== 1 && luck.id === luckyList.length &&
              <Icon name="subtraction" handleClick={handleDeleteLuck} />}
          </StyledLuckyContentContainer>)}

        <div className="iconWrapper">
          <Icon name="plus-circle" handleClick={handleAddLuck} />
        </div>
      </div>

      <p className="luckyNotice">증정인원 수를 모르는 경우, 인원수 부분을 공란으로 두세요.</p>
    </StyledLuckyInput>
  );
};

export default LuckyDrawInput;