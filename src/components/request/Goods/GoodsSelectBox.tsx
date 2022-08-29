import React, { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";
import { requestGoodsListAtom } from "../../../state/atoms";
import { StyledSelectWrapper } from "./goodsInputStyle";
import { StyledSearchList, StyledSearchListContainer } from "../units/searchListStyle";
import { ItemsType } from "../requestType";

type GoodsListValues = {
  id: number;
  key: string;
  title: string;
  items: ItemsType[];
}

type OptionsType = {
  key: string;
  value: string;
  help: string;
}

type SelectBoxPropsType = {
  value: GoodsListValues;
  isSelectOpen: boolean;
  setSelectOpen: Dispatch<SetStateAction<boolean>>;
  handleSelectTitle: (o: OptionsType) => void;
  handleSelectDirectInput: () => void;
}

const options = [
  {
    key: "all",
    value: "전체특전",
    help: "(기본특전, 일반특전 등)",
  },
  {
    key: "random",
    value: "랜덤특전",
    help: "",
  },
  {
    key: "dDay",
    value: "기념일특전",
    help: "(생일특전, 당일특전 등)",
  },
];

const GoodsSelectBox = ({
                          value,
                          isSelectOpen,
                          setSelectOpen,
                          handleSelectTitle,
                          handleSelectDirectInput,
                        }: SelectBoxPropsType) => {

  const goodsList = useRecoilValue(requestGoodsListAtom);

  return (<>
    <StyledSelectWrapper>
      <input value={value.title} disabled placeholder="특전 종류 선택하기" />
      <button type="button" onClick={() => setSelectOpen(!isSelectOpen)} />
    </StyledSelectWrapper>

    {isSelectOpen && <StyledSearchListContainer className="goodsOptionList">
      <StyledSearchList>
        {options.map((o) =>
          <li key={o.key}>
            <div>
              <p>{o.value}<span>{o.help}</span></p>
            </div>
            <button type="button" onClick={() => handleSelectTitle(o)}
                    className={`${goodsList.find(goods => goods.key === o.key) ? "disabled" : ""}`}>
              선택
            </button>
          </li>,
        )}
        <li>
          <div>
            <p>직접 입력하기</p>
          </div>
          <button type="button" onClick={() => {
            handleSelectTitle({ key: "", value: "", help: "" });
            handleSelectDirectInput();
          }}>선택
          </button>
        </li>
      </StyledSearchList>
    </StyledSearchListContainer>}
  </>);
};

export default GoodsSelectBox;