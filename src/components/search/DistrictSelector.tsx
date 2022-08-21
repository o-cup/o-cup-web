import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { divisionList } from "./data";
import { StyledDistrictSelector } from "./styles/districtSelectorStyle";

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

	const handleDivisionClick = (e: React.MouseEvent, index: number) => {
		console.log("?????");

		e.preventDefault();

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
			<div className="content">
				<h2 className="nations">
					대한민국
					<FaCaretDown />
				</h2>
				<div className="districts">
					<ul className="main">
						{divisions.map((division) => (
							<li
								role="presentation"
								key={division.name}
								onClick={(e) => handleDivisionClick(e, division.index)}
								className={division.selected ? "selected" : ""}
							>
								{division.name}
							</li>
						))}
					</ul>
					<ul className="sub">
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
					</ul>
				</div>
				<div className="result">
					<div className="chips">
						{chips.map((item, index) => (
							<span className="chip" key={item}>
								<span>{item}</span>
								<span role="presentation" onClick={() => handleDeleteClick(index)}>
									X
								</span>
							</span>
						))}
					</div>
					<div className="submit">
						<p>최대 3개까지 선택 가능합니다.</p>
						<button type="button">적용</button>
					</div>
				</div>
			</div>
		</StyledDistrictSelector>
	);
};

export default DistrictSelector;
