import React, { useState } from "react";
import {
  StyledGoodsInput,
  StyledSelectWrapper,
  StyledInputWrapper,
  StyledChipContainer
} from "./styles/goodsInputStyle";
import { StyledSearchListContainer, StyledSearchList } from "./styles/searchListStyle";
import EditableGoodsChip from "../../shared/components/EditableGoodsChip";
import Icon from "../../shared/components/Icon/Icons";

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
  handleChangeGoods: (title: string, goods: GoodsValues[], index: number) => void;
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
  }
];

const GoodsInput = ({ value, handleChangeGoods }: InputProps) => {

  const [isSelectOpen, setSelectOpen] = useState(false);
  const [isDirectInputOpen, setDirectInputOpen] = useState(false);

  /** 특전 제목 변경 */
  const setGoodsTitle = (title: string) => {
    handleChangeGoods(title, value.goods, value.id);
  };

  const handleSelectTitle = (item: { id: number; value: string; }) => {
    setGoodsTitle(item.value);
    setSelectOpen(false);
  };

  const handleSelectDirectInput = () => {
    setGoodsTitle("");
    setSelectOpen(false);
    setDirectInputOpen(true);
  };

  const handleClickSearch = () => {
    setGoodsTitle("");
    setSelectOpen(true);
    setDirectInputOpen(false);
  };

  /** 특전 목록 변경 */
  const setGoodsContent = (text: string, index: number) => {
    const goodsData = value.goods.map((g) => {
      if (g.id === index) {
        return {
          ...g,
          text
        };
      }
      return g;
    });
    handleChangeGoods(value.title, goodsData, value.id);
  };

  const addGoodsContent = () => {
    const goodsData = [
      ...value.goods,
      {
        id: value.goods[value.goods.length - 1].id + 1,
        text: ""
      }
    ];
    handleChangeGoods(value.title, goodsData, value.id);
  };

  const deleteGoodsChip = (index: number) => {
    const goodsData = value.goods.filter((g) => g.id !== index);
    handleChangeGoods(value.title, goodsData, value.id);
  };

  return (
    <StyledGoodsInput>
      {value.id === 1 && <span className="label">특전 정보</span>}
      {isDirectInputOpen ?
        <StyledInputWrapper>
          <input value={value.title} placeholder="특전 종류를 입력해주세요. (예: 마카롱특전)"
                 onChange={(e) => setGoodsTitle(e.target.value)} />
          <div className="iconContainer">
            {value.title !== "" && <Icon name="delete" handleClick={() => setGoodsTitle("")} />}
            <Icon name="search" handleClick={handleClickSearch} />
          </div>
        </StyledInputWrapper>
        : <StyledSelectWrapper>
          <input value={value.title} disabled placeholder="특전 종류 선택하기" />
          <button type="button" onClick={() => setSelectOpen(!isSelectOpen)} />
        </StyledSelectWrapper>}

      {isSelectOpen && <StyledSearchListContainer className="goodsOptionList">
        <StyledSearchList>
          {options.map((o) =>
            <li key={o.id}>
              <div>
                <p>{o.value}</p>
              </div>
              <button type="button" onClick={() => handleSelectTitle(o)}>선택</button>
            </li>
          )}
          <li>
            <div>
              <p>직접 입력하기</p>
            </div>
            <button type="button" onClick={handleSelectDirectInput}>선택</button>
          </li>
        </StyledSearchList>
      </StyledSearchListContainer>}
      <StyledChipContainer>
        {value.goods.map((g) =>
          <EditableGoodsChip key={g.id} index={g.id} value={g.text} handleChange={setGoodsContent}
                             handleDelete={deleteGoodsChip} />)}
        <button type="button" className="chipAddButton" onClick={addGoodsContent}>
          <i className="plus" />
        </button>
      </StyledChipContainer>
    </StyledGoodsInput>
  );
};

export default GoodsInput;