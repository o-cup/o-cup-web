import React, { useEffect, useRef, useState } from "react";
import { StyledGoodsChip } from "./editableGoodsChipStyle";

type GoodsChipProps = {
  value: string;
  index: number;
  handleChange: (text: string, index: number) => void;
  handleDelete: (index: number) => void;
};

const EditableGoodsChip = ({ value, index, handleChange, handleDelete }: GoodsChipProps) => {
  const [width, setWidth] = useState(0);
  const span = useRef<HTMLSpanElement>(null);

  /** input width 자동 맞춤 */
  useEffect(() => {
    if (span.current) {
      if (value === "") {
        setWidth(150); // placeholder width
      } else {
        setWidth(span.current.offsetWidth + 2);
      }
    }
  }, [span, span.current, value]);

  return (
    <StyledGoodsChip>
      <span id="hide" ref={span}>{value}</span>
      <input style={{ width }}
             value={value}
             onChange={(e) => handleChange(e.target.value, index)}
             placeholder="특전 내용 입력하기 (예: 컵홀더)" />
      {value !== "" && <button type="button" onClick={() => handleDelete(index)} />}
    </StyledGoodsChip>
  );
};

export default EditableGoodsChip;
