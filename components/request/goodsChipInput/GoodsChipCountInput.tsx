import React, { useEffect, useRef, useState } from "react";
import { StyledGoodsChipInput } from "./goodsChipInputsStyle";

type GoodsChipProps = {
	index: number;
	value: string;
	count: number;
	dayKey?: string | number | undefined;
	handleChange: (
		value: string,
		luckyId: number,
		name: "text" | "count",
		dayKey?: string | number | undefined
	) => void;
	handleDeleteChip?: (
		index: number,
		dayKey?: string | number | undefined
	) => void;
	handleDeleteValue?: (index: number) => void;
};

const GoodsChipCountInput = ({
	index,
	value,
	count,
	dayKey,
	handleChange,
	handleDeleteChip,
	handleDeleteValue,
}: GoodsChipProps) => {
	const [textWidth, setTextWidth] = useState(94);
	const textRef = useRef<HTMLSpanElement>(null);
	const [countWidth, setCountWidth] = useState(10);
	const countRef = useRef<HTMLSpanElement>(null);

	/** input width 자동 맞춤 */
	useEffect(() => {
		if (textRef.current) {
			if (value === "") {
				if (index === 1) {
					setTextWidth(94); // placeholder width
				} else {
					setTextWidth(46); // placeholder width
				}
			} else {
				setTextWidth(textRef.current.offsetWidth + 2);
			}
		}
	}, [textRef, textRef.current, value]);

	useEffect(() => {
		if (countRef.current) {
			if (!count) {
				setCountWidth(10); // placeholder width
			} else {
				setCountWidth(countRef.current.offsetWidth + 2);
			}
		}
	}, [countRef, countRef.current, count]);

	return (
		<StyledGoodsChipInput>
			<span className="hide" ref={textRef}>
				{value}
			</span>
			<input
				style={{ width: textWidth }}
				value={value}
				onChange={(e) => handleChange(e.target.value, index, "text", dayKey)}
				placeholder={index === 1 ? "특전 내용 (예: 액자)" : "특전 내용"}
			/>
			<div style={{ marginLeft: "4px" }}>
				(<span className="hide" ref={countRef}>{`${count}`}</span>
				<input
					style={{ width: countWidth }}
					className="countInput"
					value={count !== 0 ? count : ""}
					type="number"
					onChange={(e) => handleChange(e.target.value, index, "count", dayKey)}
					placeholder="0"
				/>
				명 )
			</div>
			{value !== "" && (
				<button
					type="button"
					onClick={() => {
						if (handleDeleteValue) {
							handleDeleteValue(index);
						}
						if (handleDeleteChip) {
							handleDeleteChip(index, dayKey);
						}
					}}
				/>
			)}
		</StyledGoodsChipInput>
	);
};

GoodsChipCountInput.defaultProps = {
	dayKey: undefined,
	handleDeleteChip: () => null,
	handleDeleteValue: () => null,
};

export default GoodsChipCountInput;
