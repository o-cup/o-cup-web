import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { StyledFcfsGoodsInput } from "./fcfsGoodsInputStyle";
import { requestDateRangeAtom } from "../../../state/atoms";
import Icons from "../../../shared/components/Icon/Icons";
import { getDatesInRange } from "../../../shared/utils/dateHandlers";
import { StyledChipContainer } from "../Goods/goodsInputStyle";
import EditableGoodsChip from "../../../shared/components/EditableGoodsChip";

const TYPE = [
  { key: "A", content: "매일\n동일해요" },
  { key: "B", content: "날짜별로\n달라요" },
  { key: "C", content: "기념일에만\n달라요" },
];

// 선착 타입 A: 매일 같음
const DefaultTypeA = { type: "A", items: [{ id: 1, text: "" }] };

// 선착 타입 B: 날짜별로 다름
const DefaultTypeB = { type: "B", data: [{ day: 0, items: [{ id: 1, text: "" }] }] };

// 선착 타입 C: 기념일만 다름
const DefaultTypeC = { type: "C", items: { dDay: [{ id: 1, text: "" }], others: [{ id: 1, text: "" }] } };

type items = {
  id: number,
  text: string
}

type typeA = {
  type: "A"
  items: items[]
}

type typeB = {
  type: "B"
  data: { day: number, items: items[] }[]
}

type typeC = {
  type: "C"
  items: { dDay: items[], others: items[] }
}

const FcfsGoodsInput = () => {
  const dateRange = useRecoilValue(requestDateRangeAtom);

  const [hasDateRange, setHasDateRange] = useState(dateRange.startAt && dateRange.endAt);
  /**
   * A: 매일 동일해요
   * B: 날짜별로 달라요
   * C: 기념일에만 달라요
   * X: 선착특전 없음(DB에 데이터 전송 시 선착순 정보 빈 배열로 처리)
   * */
  const [type, setType] = useState(""); // "A" | "B" | "C" | "X"

  const [tempState, setTempState] = useState({} as typeA | typeB | typeC);

  // 날짜 변경에 맞춰 DefaultTypeB에 날짜입력
  useEffect(() => {
    setHasDateRange(dateRange.startAt && dateRange.endAt);
    const date = getDatesInRange(dateRange.startAt, dateRange.endAt);
    DefaultTypeB.data = date.map((d) => ({ day: d.getDate(), items: [{ id: 1, text: "" }] }));
  }, [dateRange]);

  const renderCheckbox = (checkType: string) => {
    if (!hasDateRange) {
      return (<Icons name="check_blank" />);
    }
    return (checkType === type) ? <Icons name="check_true" /> :
      <Icons name="check_false" />;
  };

  return (
    <StyledFcfsGoodsInput>
      <div className="fcfsTitle">
        <span className="label">선착특전</span>
        <div className={`checkOpen ${hasDateRange ? "active" : ""} ${type === "X" ? "selected" : "notSelected"}`}>
          <button type="button" onClick={() => type === "X" ? setType("") : setType("X")}>
            {renderCheckbox("X")}
            선착특전 없음
          </button>
        </div>
      </div>

      <div className={`typeSelector ${hasDateRange ? "active" : ""}`}>
        {TYPE.map((t) =>
          <button type="button" key={t.key}
                  className={`typeButton ${type === t.key ? "selected" : "notSelected"}`}
                  onClick={() => setType(t.key)}>
            {renderCheckbox(t.key)}
            {t.content}
          </button>)}
      </div>

      {type === "A" && <StyledChipContainer>
        <span className="highlight">매일</span>
        {/* {tempState.type === "A" &&
          tempState.items.map((g) =>
            <EditableGoodsChip key={g.id} index={g.id} value={g.text}
                               handleChange={(e) => console.log(e)}
                               handleDelete={() => console.log("ddd")} />)} */}
        <button type="button" className="chipAddButton">
          <i className="plus" />
        </button>
      </StyledChipContainer>}

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