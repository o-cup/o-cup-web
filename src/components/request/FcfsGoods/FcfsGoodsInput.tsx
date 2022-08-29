import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  StyledFcfsGoodsInput,
  StyledFcfsTitle,
  StyledFcfsTypeSelector,
} from "./fcfsGoodsInputStyle";
import { requestInputsAtom } from "../../../state/atoms";
import Icons from "../../../shared/components/Icon/Icons";
import { getDatesInRange } from "../../../shared/utils/dateHandlers";
import { RequestFcfsType } from "../requestType";
import FcfsContent from "./chipContents/FcfsContent";

const TYPE = [
  { key: "A", content: "매일\n동일해요" },
  { key: "B", content: "날짜별로\n달라요" },
  { key: "C", content: "기념일에만\n달라요" },
];

const TYPE_C = { others: "매일", dDay: "기념일" };

// 선착 타입 A: 매일 같음
const DefaultTypeA: RequestFcfsType = {
  type: "A",
  data: [{ items: [{ id: 1, text: "", count: 0 }] }],
};

// 선착 타입 B: 날짜별로 다름
let DefaultTypeB: RequestFcfsType = {
  type: "B",
  data: [{ day: 0, items: [{ id: 1, text: "", count: 0 }] }],
};

// 선착 타입 C: 기념일만 다름
const DefaultTypeC: RequestFcfsType = {
  type: "C",
  data: [
    { key: "others", items: [{ id: 1, text: "", count: 0 }] },
    { key: "dDay", items: [{ id: 1, text: "", count: 0 }] },
  ],
};

const FcfsGoodsInput = () => {
  const [requestInputs, setRequestInputs] = useRecoilState(requestInputsAtom);
  const { dateRange, goods, goods: { firstCome } } = requestInputs;

  const [hasDateRange, setHasDateRange] = useState(dateRange.startAt && dateRange.endAt);

  /**
   * A: 매일 동일해요
   * B: 날짜별로 달라요
   * C: 기념일에만 달라요
   * X: 선착특전 없음(fcfsList === {})
   * */
  const [type, setType] = useState(firstCome?.type || ""); // "A" | "B" | "C" | "X"

  const renderCheckbox = (checkType: string) => {
    if (!hasDateRange) {
      return (<Icons name="check_blank" />);
    }
    return (checkType === type) ? <Icons name="check_true" /> :
      <Icons name="check_false" />;
  };

  const handleFirstCome = (fcfs: RequestFcfsType) => {
    setRequestInputs({
      ...requestInputs,
      goods: {
        ...goods,
        firstCome: fcfs,
      },
    });
  };

  useEffect(() => {
    if (type === "A") {
      handleFirstCome(DefaultTypeA);
    }
    if (type === "B") {
      handleFirstCome(DefaultTypeB);
    }
    if (type === "C") {
      handleFirstCome(DefaultTypeC);
    }
    if (type === "X") {
      handleFirstCome({} as RequestFcfsType);
    }
  }, [type]);

  /* 날짜 변경에 맞춰 DefaultTypeB에 날짜입력 */
  useEffect(() => {
    setHasDateRange(dateRange.startAt && dateRange.endAt);
    const date = getDatesInRange(dateRange.startAt, dateRange.endAt);
    DefaultTypeB = {
      type: "B",
      data: date.map((d) => ({ day: d.getDate(), items: [{ id: 1, text: "", count: 0 }] }))
    };

    if(firstCome?.type === "B") {
      handleFirstCome(DefaultTypeB);
    }
  }, [dateRange]);

  return (
    <StyledFcfsGoodsInput>
      <StyledFcfsTitle>
        <span className="label">선착특전</span>
        <div className={`checkOpen ${hasDateRange ? "active" : ""} ${type === "X" ? "selected" : "notSelected"}`}>
          <button type="button" onClick={() => type === "X" ? setType("") : setType("X")}>
            {renderCheckbox("X")}
            선착특전 없음
          </button>
        </div>
      </StyledFcfsTitle>

      <StyledFcfsTypeSelector className={`${hasDateRange ? "active" : ""}`}>
        {TYPE.map((t) =>
          <button type="button" key={t.key}
                  className={`typeButton ${type === t.key ? "selected" : "notSelected"}`}
                  onClick={() => setType(t.key)}>
            {renderCheckbox(t.key)}
            {t.content}
          </button>)}
      </StyledFcfsTypeSelector>

      {firstCome?.type && firstCome?.data &&
        firstCome.data.map((dataObj, i) => {
          let highlight = "매일";
          if (dataObj.day) {
            highlight = `${dataObj.day}일`;
          }
          if (dataObj.key === "others" || dataObj.key === "dDay") {
            highlight = TYPE_C[dataObj.key];
          }
          return (
            <FcfsContent dataObj={dataObj} highlight={highlight} key={dataObj.day || dataObj.key || i}/>
          );
        })
      }

      <div className="fcfsNotice">
        {!hasDateRange &&
          <p className="dateNotice">위 달력에서 이벤트 기간을 먼저 선택해주세요.</p>}
        {(type === "A" || type === "B" || type === "C") &&
          <p className="notice">선착 증정인원 수를 모르는 경우, 인원수 부분을 공란으로 두세요.</p>}
        {type === "C" &&
          <p className="notice">선착순이 아닌 기념일특전(생일특전, 당일특전 등)은 아래 일반특전 항목에서 작성해주세요.</p>}
      </div>
    </StyledFcfsGoodsInput>
  );
};

export default FcfsGoodsInput;