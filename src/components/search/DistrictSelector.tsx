import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { StyledDistrictSelector } from "./styles/districtSelectorStyle";
import { useRegCodes } from "../../hooks";
import { RegCodeItem } from "../../types";

type DistrictSelectorProps = {
	handleSubmit: () => void;
};

const DistrictSelector = ({ handleSubmit }: DistrictSelectorProps) => {
	const [selectedDiv, setSelectedDiv] = useState<RegCodeItem>({ code: "1100000000", name: "서울특별시" });
	const [selectedDist, setSelectedDist] = useState<RegCodeItem[]>([{ code: "1100000000", name: "서울특별시 전체" }]);

	// const [districtList, setDistrictList] = useState([]);

	const { divisionData, districtData } = useRegCodes({ divCode: selectedDiv.code });

	const handleDivClick = (div: RegCodeItem) => {
		setSelectedDiv(div);

		const isDuplicated = selectedDist.find((dist) => dist.code === "all");
		if (div.code === "all" && !isDuplicated) {
			setSelectedDist([{ code: "all", name: "전국" }, ...selectedDist]);
		}
	};

	const handleDistClick = (dist: RegCodeItem) => {
		const isDuplicated = selectedDist.find((item) => item.code === dist.code);
		if (isDuplicated) return;

		const allDist = dist.code.substring(2, 4) === "00";
		if (allDist) {
			setSelectedDist([...selectedDist, { code: dist.code, name: `${selectedDiv.name} ${dist.name}` }]);
		}
	};

	const handleDeleteClick = (code: string) => {
		console.log(code);
	};

	return (
		<StyledDistrictSelector>
			<div className="content">
				<h2 className="nations">
					대한민국
					<FaCaretDown />
				</h2>

				<div className="districts">
					<ul className="main">
						{divisionData?.map((div: RegCodeItem) => (
							<li
								key={div.code}
								role="presentation"
								onClick={() => handleDivClick(div)}
								className={div.code === selectedDiv.code ? "selected" : ""}
							>
								{div.name}
							</li>
						))}
						{/* {divisions.map((division) => (
							<li
								role="presentation"
								key={division.name}
								onClick={(e) => handleDivisionClick(e, division.index)}
								className={division.selected ? "selected" : ""}
							>
								{division.name}
							</li>
						))} */}
					</ul>
					<ul className="sub">
						{districtData.map((dist: RegCodeItem) => (
							<li
								key={dist.code}
								role="presentation"
								onClick={() => handleDistClick(dist)}
								className={dist.selected ? "selected" : ""}
							>
								{dist.name}
							</li>
						))}
						{/* {divisions
							.find((div) => div.selected)
							?.districts.map((dist) => (
								<li
									role="presentation"
									key={dist.name}
									onClick={() => handleDistrictClick(dist.index)}
									className={dist.selected ? "selected" : ""}
								>
									{dist.name}
								</li>
							))} */}
					</ul>
				</div>

				<div className="result">
					<div className="chips">
						{selectedDist.map((dist) => (
							<span className="chip" key={dist.code}>
								<span>{dist.name}</span>
								<span role="presentation" onClick={() => handleDeleteClick(dist.code)}>
									X
								</span>
							</span>
						))}
					</div>
					<div className="submit">
						<p>최대 3개까지 선택 가능합니다.</p>
						<button type="button" onClick={handleSubmit}>
							적용
						</button>
					</div>
				</div>
			</div>
		</StyledDistrictSelector>
	);
};

export default DistrictSelector;
