import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { StyledDistrictSelector } from "./styles/districtSelectorStyle";
import { useRegCodes } from "../../hooks";
import { RegCodeItem } from "../../types";
import { MAX_DISTRICT_CHIPS } from "../../shared/constants";

type DistrictSelectorProps = {
	handleSubmit: () => void;
};

const isAllDist = (code: string) => code.substring(2, 4) === "00";

const DistrictSelector = ({ handleSubmit }: DistrictSelectorProps) => {
	const [selectedDiv, setSelectedDiv] = useState<RegCodeItem>({ code: "1100000000", name: "서울특별시" });
	const [districtList, setDistrictList] = useState<RegCodeItem[]>([]);
	const [chips, setChips] = useState<RegCodeItem[]>([]);

	const { divisionData, districtData } = useRegCodes({ div: selectedDiv });

	useEffect(() => {
		if (districtData.length) {
			setDistrictList(districtData);
		}
	}, [districtData]);

	useEffect(() => {
		if (!districtList.length) return;

		const selected = districtList.filter((dist) => dist.selected);
		setChips(selected);
	}, [districtData, districtList]);

	const handleDivClick = (div: RegCodeItem) => {
		if (chips.length >= MAX_DISTRICT_CHIPS) return;

		setSelectedDiv(div);

		const isDuplicated = chips.find((dist) => dist.code === "all");
		if (div.code === "all" && !isDuplicated) {
			setChips([{ code: "all", name: "전국" }, ...chips]);
		}
	};

	const handleDistClick = (dist: RegCodeItem) => {
		if (chips.length >= MAX_DISTRICT_CHIPS) return;

		const isDuplicated = chips.find((item) => item.code === dist.code);
		if (isDuplicated) return;

		const newList = districtList.map((item: RegCodeItem) => {
			if (!isAllDist(dist.code) && isAllDist(item.code)) {
				return {
					...item,
					selected: false,
				};
			}
			return {
				...item,
				selected: item.code === dist.code ? true : item.selected,
			};
		});

		setDistrictList(newList);
	};

	const handleDeleteClick = (dist: RegCodeItem) => {
		const newList = districtList.map((item) => ({
			...item,
			selected: item.code === dist.code ? false : item.selected,
		}));
		setDistrictList(newList);
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
					</ul>
					<ul className="sub">
						{districtList.map((dist: RegCodeItem) => (
							<li
								key={dist.code}
								role="presentation"
								onClick={() => handleDistClick(dist)}
								className={dist.selected ? "selected" : ""}
							>
								{dist.name}
							</li>
						))}
					</ul>
				</div>

				<div className="result">
					<div className="chips">
						{chips.map((dist) => (
							<span className="chip" key={dist.code}>
								<span>{`${selectedDiv.name} ${dist.name}`}</span>
								<span role="presentation" onClick={() => handleDeleteClick(dist)}>
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
