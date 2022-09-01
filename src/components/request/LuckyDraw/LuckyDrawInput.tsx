import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { requestInputsAtom } from "../../../state/atoms";
import {
  StyledLuckyInput,
  StyledLuckyTitle,
  StyledLuckyContentContainer,
} from "./luckyInputStyle";
import Icons from "../../../shared/components/Icon/Icons";
import GoodsChipCountInput from "../GoodsChipInput/GoodsChipCountInput";

const LuckyDrawInput = () => {
  const [requestInputs, setRequestInputs] = useRecoilState(requestInputsAtom);
  const { goods } = requestInputs;

  const [hasLucky, setHasLucky] = useState(true);

  /** "럭키드로우 없음" 선택하는 경우 값 초기화 */
  useEffect(() => {
    if (!hasLucky) {
      setRequestInputs({
        ...requestInputs,
        goods: {
          ...goods,
          lucky: [],
        },
      });
    } else {
      setRequestInputs({
        ...requestInputs,
        goods: {
          ...goods,
          lucky: [
            { id: 1, text: "", count: 0 },
            { id: 2, text: "", count: 0 },
          ],
        },
      });
    }
  }, [hasLucky]);

  const handleInputChange = (value: string, luckyId: number, key: "text" | "count") => {
    const luckyData = goods.lucky?.map((luck) => {
      if (luck.id === luckyId) {
        if (key === "text") {
          return {
            ...luck,
            text: value,
          };
        }
        if (key === "count") {
          return {
            ...luck,
            count: parseInt(value, 10),
          };
        }
      }
      return luck;
    });

    setRequestInputs({
      ...requestInputs,
      goods: {
        ...goods,
        lucky: luckyData,
      },
    });
  };

  const handleDeleteValue = (luckyId: number) => {
    const luckyData = goods.lucky?.map((luck) => {
      if (luck.id === luckyId) {
        return {
          ...luck,
          text: "",
          count: 0,
        };
      }
      return luck;
    });

    setRequestInputs({
      ...requestInputs,
      goods: {
        ...goods,
        lucky: luckyData,
      },
    });
  };

  const handleAddLuck = () => {
    if (goods.lucky) {
      setRequestInputs({
        ...requestInputs,
        goods: {
          ...goods,
          lucky: [
            ...goods.lucky,
            { id: goods.lucky.length + 1, text: "", count: 0 },
          ],
        },
      });
    }
  };

  const handleDeleteLuck = () => {
    if (goods.lucky && goods.lucky.length > 0) {
      const popLuck = goods.lucky.slice();
      popLuck.pop();
      setRequestInputs({
        ...requestInputs,
        goods: {
          ...goods,
          lucky: popLuck,
        },
      });
    }
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
        {goods.lucky?.map((luck) =>
          <StyledLuckyContentContainer key={luck.id}>
            <div className="highlight">{luck.id}등</div>
            <div className="chipContainer">
              <GoodsChipCountInput index={luck.id} value={luck.text} count={luck.count}
                                   handleChange={handleInputChange}
                                   handleDeleteValue={handleDeleteValue} />
            </div>
            {luck.id !== 1 && luck.id === goods.lucky?.length &&
              <Icons name="subtraction" handleClick={handleDeleteLuck} />}
          </StyledLuckyContentContainer>)}

        <div className="iconWrapper">
          <Icons name="plus-circle" handleClick={handleAddLuck} />
        </div>
      </div>

      <p className="luckyNotice">증정인원 수를 모르는 경우, 인원수 부분을 공란으로 두세요.</p>
    </StyledLuckyInput>
  );
};

export default LuckyDrawInput;