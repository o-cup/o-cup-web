import React, { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { StyledDistrictSelector } from "./styles/districtSelectorStyle";
import { useRegCodes } from "../../hooks";
import { RegCodeItem } from "../../types";

type DistrictSelectorProps = {
	handleSubmit: () => void;
};

const DistrictSelector = ({ handleSubmit }: DistrictSelectorProps) => {
	const [selectedDiv, setSelectedDiv] = useState<RegCodeItem>({ code: "1100000000", name: "서울특별시" });
	const [districtList, setDistrictList] = useState<RegCodeItem[]>([]);
	const [selectedDist, setSelectedDist] = useState<RegCodeItem[]>([]);

	const { divisionData, districtData } = useRegCodes({ div: selectedDiv });

	useEffect(() => {
		setDistrictList(districtData);
	}, [districtData]);

	useEffect(() => {
		const selected = districtList.filter((dist) => dist.selected);
		setSelectedDist([...selectedDist, ...selected]);
	}, [districtList]);

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

		console.log("dist", dist);

		const newList = districtList.map((item: RegCodeItem) => ({
			...item,
			selected: item.code === dist.code,
		}));

		setDistrictList(newList);
	};

	console.log("districtList", districtList);

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
						{selectedDist.map((dist) => (
							<span className="chip" key={dist.code}>
								<span>{`${selectedDiv.name} ${dist.name}`}</span>
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
