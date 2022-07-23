import React, { useEffect, useState } from "react";
import { Chip, SelectList, StyledDistrictSelector } from "../../styles/districtSelectorStyle";
import { divisionList } from "./data";

type DistrictType = {
	index: number;
	name: string;
	selected: boolean;
}[];

const DistrictSelector = () => {
	const [divisions, setDivisions] = useState(divisionList);
	const [districts, setDistricts] = useState<DistrictType>([]);
	const [chips, setChips] = useState([""]);

	useEffect(() => {
		const divisionData = divisions.find((division) => division.selected);
		if (divisionData) {
			const districtData =
				divisionData?.districts.map((district, index) => ({
					index: index + 1,
					name: district,
					selected: false,
				})) || [];
			setDistricts(districtData);
		}
	}, [divisions]);

	useEffect(() => {
		// const selectedDivisionName = divisions.find((division) => division.selected)?.name;
		// const chipsText = districts
		// 	.filter((district) => district.selected)
		// 	?.map((district) => `${selectedDivisionName} ${district.name}`);
		// console.log("chipsText", chipsText);
		// setChips([...chips, ...chipsText]);
	}, [districts, divisions]);

	useEffect(() => {
		// divisions selected 프로퍼티가 업데이트 되었을 때,
		// chips에 하나만 더해주기?
	}, []);

	const handleDivisionClick = (index: number) => {
		const updated = divisions.map((division) => {
			if (division.index === index) {
				return {
					...division,
					selected: true,
				};
			}
			return { ...division, selected: false };
		});
		setDivisions(updated);
	};

	const handleDistrictClick = (index: number) => {
		if (chips.length >= 3) return;

		const updated = districts.map((district) => {
			if (district.index === index) {
				return {
					...district,
					selected: true,
				};
			}
			return { ...district };
		});
		setDistricts(updated);

		const currentDivisionName = divisions.find((division) => division.selected)?.name;
		const districtName = districts.find((district) => district.index === index)?.name;
		const newChip = `${currentDivisionName} ${districtName}`;
		setChips([...chips, newChip]);
	};

	return (
		<StyledDistrictSelector>
			<h2>지역</h2>
			<div className="nations">
				<h6>국가</h6>
				<select>
					<option value="korea">한국</option>
				</select>
			</div>
			<div className="districts">
				<div>
					<h6>지역</h6>
					<SelectList className="main">
						{divisions.map((division) => (
							<li
								role="presentation"
								key={division.name}
								onClick={() => handleDivisionClick(division.index)}
								className={division.selected ? "selected" : ""}
							>
								{division.name}
							</li>
						))}
					</SelectList>
				</div>
				<div>
					<h6>상세지역</h6>
					<SelectList className="sub">
						{districts.map((district) => (
							<li
								role="presentation"
								key={district.name}
								onClick={() => handleDistrictClick(district.index)}
								className={district.selected ? "selected" : ""}
							>
								{district.name}
							</li>
						))}
					</SelectList>
				</div>
			</div>
			<div className="selected">
				<div className="chipsContainer">
					{chips.map((item) => (
						<Chip key={item}>
							<span>{item}</span>
							<span>X</span>
						</Chip>
					))}
				</div>
				<p>최대 3개까지 선택 가능합니다.</p>
			</div>
			<div>
				<button type="button">선택 완료</button>
			</div>
		</StyledDistrictSelector>
	);
};

export default DistrictSelector;
