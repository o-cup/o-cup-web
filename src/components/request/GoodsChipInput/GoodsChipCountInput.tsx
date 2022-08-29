import React, { useEffect, useRef, useState } from "react";
import { StyledGoodsChipInput } from "./goodsChipInputsStyle";

type GoodsChipProps = {
  index: number;
  value: string;
  count: number;
  handleChange: (value: string, luckyId: number, key: "text" | "count") => void;
  handleDelete: (index: number) => void;
};

const GoodsChipCountInput = ({ index, value, count, handleChange, handleDelete }: GoodsChipProps) => {
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);
  const [countWidth, setCountWidth] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);

  /** input width 자동 맞춤 */
  useEffect(() => {
    if (textRef.current) {
      if (value === "") {
        setTextWidth(94); // placeholder width
      } else {
        setTextWidth(textRef.current.offsetWidth + 2);
      }
    }
  }, [textRef, textRef.current, value]);

  useEffect(() => {
    if (countRef.current) {
      if (!count) {
        setCountWidth(8); // placeholder width
      } else {
        setCountWidth(countRef.current.offsetWidth + 2);
      }
    }
  }, [countRef, countRef.current, count]);

  return (
    <StyledGoodsChipInput>
      <span className="hide" ref={textRef}>{value}</span>
      <input style={{ width: textWidth }}
             value={value}
             onChange={(e) => handleChange(e.target.value, index, "text")}
             placeholder="특전 내용 (예: 액자)" />
      <div style={{ marginLeft: "4px" }}>
        (
        <span className="hide" ref={countRef}>{`${count}`}</span>
        <input style={{ width: countWidth }}
               className="countInput"
               value={count} type="number"
               onChange={(e) => handleChange(e.target.value, index, "count")}
               placeholder="0" />
        명)
      </div>
      {value !== "" && <button type="button" onClick={() => handleDelete(index)} />}
    </StyledGoodsChipInput>
  );
};

export default GoodsChipCountInput;
