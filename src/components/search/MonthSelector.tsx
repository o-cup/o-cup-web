import React, { SetStateAction, useState, Dispatch } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Month, StyledMonthSelector } from "./styles/monthSelectorStyle";

type MonthSelectorProps = {
	selectedMonth: number | null;
	setSelectedMonth: Dispatch<SetStateAction<number | null>>;
};

const MonthSelector = ({ selectedMonth, setSelectedMonth }: MonthSelectorProps) => {
	const [toggle, setToggle] = useState(false);

	const handleToggleClick = () => setToggle(!toggle);

	const months = Array.from({ length: 12 }, (_, i) => i + 1);

	return (
		<StyledMonthSelector>
			<h2>8월 생일 아티스트를 찾아보세요.</h2>
			<div className="toggle">
				<p>다른 생일 달 아티스트 찾아보기</p>
				{toggle ? <FaCaretUp onClick={handleToggleClick} /> : <FaCaretDown onClick={handleToggleClick} />}
			</div>

			{toggle && (
				<div className="selectBox">
					{months.map((month) => (
						<Month
							key={month}
							isActive={selectedMonth === month}
							onClick={() => setSelectedMonth(month)}
						>{`${month}월`}</Month>
					))}
				</div>
			)}
		</StyledMonthSelector>
	);
};

export default MonthSelector;
