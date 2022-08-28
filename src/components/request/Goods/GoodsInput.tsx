import React, { useState } from "react";
import {
  StyledGoodsInput,
  StyledSelectWrapper,
  StyledInputWrapper,
  StyledChipContainer
} from "./goodsInputStyle";
import { StyledSearchListContainer, StyledSearchList } from "../units/searchListStyle";
import EditableGoodsChip from "../../../shared/components/EditableGoodsChip";
import Icons from "../../../shared/components/Icon/Icons";
import { ItemsType } from "../requestType";

type GoodsListValues = {
  id: number;
  title: string;
  items: ItemsType[];
}

type InputProps = {
  value: GoodsListValues;
  handleChangeGoods: (title: string, items: ItemsType[], index: number) => void;
};

const options = [
  {
    id: 1,
    value: "전체특전"
  },
  {
    id: 2,
    value: "스페셜특전"
  },
  {
    id: 3,
    value: "기념일특전(생일특전, 당일특전 등)"
  }
];

const GoodsInput = ({ value, handleChangeGoods }: InputProps) => {

  const [isSelectOpen, setSelectOpen] = useState(false);
  const [isDirectInputOpen, setDirectInputOpen] = useState(false);

  /** 특전 제목 변경 */
  const setGoodsTitle = (title: string) => {
    handleChangeGoods(title, value.items, value.id);
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
    const goodsData = value.items.map((g) => {
      if (g.id === index) {
        return {
          ...g,
          text
        };
      }
      return g;
    });
    console.log(value.title, goodsData, value.id)
    handleChangeGoods(value.title, goodsData, value.id);
  };

  const addGoodsContent = () => {
    const goodsData = [
      ...value.items,
      {
        id: value.items[value.items.length - 1].id + 1,
        text: ""
      }
    ];
    handleChangeGoods(value.title, goodsData, value.id);
  };

  const deleteGoodsChip = (index: number) => {
    const goodsData = value.items.filter((g) => g.id !== index);
    handleChangeGoods(value.title, goodsData, value.id);
  };

  return (
    <StyledGoodsInput>
      {value.id === 1 && <span className="label">일반특전</span>}
      {isDirectInputOpen ?
        <StyledInputWrapper>
          <input value={value.title} placeholder="특전 종류를 입력해주세요. (예: 마카롱특전)"
                 onChange={(e) => setGoodsTitle(e.target.value)} />
          <div className="iconContainer">
            {value.title !== "" && <Icons name="delete" handleClick={() => setGoodsTitle("")} />}
            <Icons name="search" handleClick={handleClickSearch} />
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
        {value.items.map((g) =>
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