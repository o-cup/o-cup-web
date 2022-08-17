import React, { useState } from "react";
import { StyledGoodsInput, StyledSelectWrapper, StyledChipContainer } from "./styles/goodsInputStyle";
import { StyledSearchListContainer, StyledSearchList } from "./styles/searchListStyle";
import EditableGoodsChip from "../../shared/components/EditableGoodsChip";

type GoodsValues = {
  id: number;
  text: string;
}

type GoodsListValues = {
  id: number;
  title: string;
  goods: GoodsValues[];
}

type InputProps = {
  value: GoodsListValues;
};

const options = [
  {
    id: 1,
    value: "전체특전"
  },
  {
    id: 2,
    value: "선착특전"
  },
  {
    id: 3,
    value: "스페셜특전"
  },
  {
    id: 4,
    value: "직접 입력하기"
  }
];

const GoodsInput = ({ value }: InputProps) => {
  const [titleOption, setTitleOption] = useState(value.title);
  const [isSelectOpen, setSelectOpen] = useState(false);

  return (
    <StyledGoodsInput>
      {value.id === 1 && <span className="label">특전 정보</span>}
      <StyledSelectWrapper>
        <input value={titleOption} disabled placeholder="특전 종류 선택하기" />
        <button type="button" onClick={() => setSelectOpen(!isSelectOpen)} />
      </StyledSelectWrapper>
      {isSelectOpen && <StyledSearchListContainer>
        <StyledSearchList>
          {options.map((o) =>
            <li key={o.id}>
              <div>
                <p>{o.value}</p>
              </div>
              <button type="button" onClick={() => {
                setTitleOption(o.value);
                setSelectOpen(false);
              }}>선택
              </button>
            </li>
          )}
        </StyledSearchList>
      </StyledSearchListContainer>}
      <StyledChipContainer>
        {value.goods.map((g) => <EditableGoodsChip key={g.id} value={g.text} />)}
        <button type="button" className="chipAddButton"><i className="plus"/></button>
      </StyledChipContainer>
    </StyledGoodsInput>
  );
};

export default GoodsInput;