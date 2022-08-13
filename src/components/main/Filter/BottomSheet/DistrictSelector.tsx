import React, { useEffect, useState } from "react";
import { Chip, SelectList, StyledDistrictSelector } from "../../../../styles/districtSelectorStyle";
import { divisionList } from "./data";

const DistrictSelector = () => {
	const [divisions, setDivisions] = useState(divisionList);
	const [chips, setChips] = useState<string[]>([]);
	const MAX_CHIP_LENGTH = 3;

	useEffect(() => {
		const isAllSelected = divisions.find((div) => div.index === 1 && div.selected);
		if (isAllSelected) {
			setChips(["전국"]);
			return;
		}
		const texts: string[] = [];
		divisions.forEach((div) => {
			div.districts.forEach((dist) => {
				if (dist.selected) {
					if (texts.includes(dist.name)) {
						return;
					}
					const chipText = `${div.name} ${dist.name}`;
					texts.push(chipText);
				}
			});
		});
		setChips(texts);
	}, [divisions, chips.length]);

	const handleDivisionClick = (index: number) => {
		const isAllSelected = index === 1;
		if (isAllSelected) {
			const newData = divisions.map((div) => {
				const updated = div.districts.map((dist) => ({
					...dist,
					selected: false,
				}));
				return {
					...div,
					selected: div.index === 1,
					districts: updated,
				};
			});
			setDivisions(newData);
			return;
		}

		if (chips.length >= MAX_CHIP_LENGTH) return;
		const newData = divisions.map((div) => {
			if (div.index === index) {
				const updated = div.districts.map((dist) => {
					if (dist.index === 1) {
						return {
							...dist,
							selected: true,
						};
					}
					return {
						...dist,
						selected: false,
					};
				});
				return {
					...div,
					selected: true,
					districts: updated,
				};
			}
			return { ...div, selected: false };
		});
		setDivisions(newData);
	};

	const handleDistrictClick = (index: number) => {
		if (chips.length >= MAX_CHIP_LENGTH) return;

		const newData = divisions.map((div) => {
			if (div.selected) {
				const updatedDist = div.districts.map((dist) => {
					if (dist.index === index) {
						return {
							...dist,
							selected: true,
						};
					}
					return { ...dist };
				});
				return {
					...div,
					districts: updatedDist,
				};
			}
			return { ...div };
		});
		setDivisions(newData);
	};

	const handleDeleteClick = (index: number) => {
		const newData = divisions.map((div) => {
			const updatedDist = div.districts.map((dist) => {
				if (chips[index].includes(dist.name)) {
					return {
						...dist,
						selected: false,
					};
				}
				return dist;
			});
			return {
				...div,
				districts: updatedDist,
			};
		});
		setDivisions(newData);
	};

	return (
		<StyledDistrictSelector>
			<h2>지역</h2>
			<div className="content">
				<div className="nations">
					<h6>국가</h6>
					<select disabled>
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
							{divisions
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
								))}
						</SelectList>
					</div>
				</div>
				<div className="selected">
					<div className="chipsContainer">
						{chips.map((item, index) => (
							<Chip key={item}>
								<span>{item}</span>
								<span role="presentation" onClick={() => handleDeleteClick(index)}>
									X
								</span>
							</Chip>
						))}
					</div>
					<p>최대 3개까지 선택 가능합니다.</p>
				</div>
				<div>
					<button type="button">선택 완료</button>
				</div>
			</div>
		</StyledDistrictSelector>
	);
};

export default DistrictSelector;
