import React, { useEffect, useRef, useState } from "react";
import { StyledGoodsChip } from "./editableGoodsChipStyle";

type GoodsChipProps = {
  value: string;
};

const EditableGoodsChip = ({ value }: GoodsChipProps) => {
  const [text, setText] = useState(value);
  const [width, setWidth] = useState(0);
  const span = useRef<HTMLSpanElement>(null);

  /** input width 자동 맞춤 */
  useEffect(() => {
    if (span.current) {
      if (text === "") {
        setWidth(150); // placeholder width
      } else {
        setWidth(span.current.offsetWidth + 2);
      }
    }
  }, [span, span.current, text]);

  return (
    <StyledGoodsChip>
      <span id="hide" ref={span}>{text}</span>
      <input style={{ width }}
             value={text}
             onChange={(e) => setText(e.target.value)}
             placeholder="특전 내용 입력하기 (예: 컵홀더)" />
      {text !== "" && <button type="button" />}
    </StyledGoodsChip>
  );
};

export default EditableGoodsChip;
