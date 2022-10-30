import React, { memo, useEffect, useState } from "react";
import { Icon } from "../../../shared/components";
import { MAX_DISTRICT_CHIPS } from "../../../shared/constants";
import { useRegCodes } from "../../../shared/hooks";
import divisionData from "../divisions";
import { StyledDistrictSelector } from "./styles/districtSelectorStyle";
import type { RegCodeItem } from "../types";
import type { Dispatch, SetStateAction } from "react";

type DistrictSelectorProps = {
	// handleSubmit: () => void;
	selectedDists: RegCodeItem[];
	setSelectedDists: Dispatch<SetStateAction<RegCodeItem[]>>;
};

const isAllDist = (code: string) => code.substring(2, 4) === "00";

const DistrictSelector = ({
	selectedDists,
	setSelectedDists,
}: DistrictSelectorProps) => {
	const [divisionList, setDivisionList] = useState<RegCodeItem[]>([]);
	const [districtList, setDistrictList] = useState<RegCodeItem[]>([]);

	const selectedDiv =
		divisionList.find((div) => div.selected) || divisionData[0];

	const districtData = useRegCodes(selectedDiv!);

	useEffect(() => {
		if (divisionData) {
			setDivisionList(divisionData);
		}
	}, []);

	useEffect(() => {
		if (districtData.length) {
			setDistrictList(districtData);
		}
	}, [districtData]);

	useEffect(() => {
		if (!districtList.length) return;

		const selected = districtList
			.filter((dist) => dist.selected)
			.map((dist) => ({ ...dist, name: `${selectedDiv.name} ${dist.name}` }));

		setSelectedDists(selected);
	}, [districtList, setSelectedDists, selectedDiv]);

	const handleDivClick = (div: RegCodeItem) => {
		const newData = divisionList.map((item) => ({
			...item,
			selected: item.code === div.code,
		}));
		setDivisionList(newData);

		const isDuplicated = selectedDists.find((dist) => dist.code === "all");
		if (div.code === "all" && !isDuplicated) {
			setSelectedDists([{ code: "all", name: "전국" }, ...selectedDists]);
		}
	};

	const handleDistClick = (dist: RegCodeItem) => {
		if (isAllDist(dist.code) && selectedDists.length > 0) {
			const newList = districtList.map((item) => ({
				...item,
				selected: item.code === dist.code,
			}));
			setDistrictList(newList);
			return;
		}

		if (selectedDists.length >= MAX_DISTRICT_CHIPS) return;

		const isDuplicated = selectedDists.find((item) => item.code === dist.code);
		if (isDuplicated) return;

		const newData = districtList.map((item: RegCodeItem) => {
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

		setDistrictList(newData);
	};

	const handleDeleteClick = (dist: RegCodeItem) => {
		const newData = districtList.map((item) => ({
			...item,
			selected: item.code === dist.code ? false : item.selected,
		}));
		setDistrictList(newData);
	};

	const handleResetClick = () => {
		const newDistrictData = districtList.map((dist) => ({
			...dist,
			selected: isAllDist(dist.code),
		}));
		setDistrictList(newDistrictData);
	};

	return (
		<StyledDistrictSelector>
			<div className="title">
				<h2 className="nations">
					대한민국
					{/* <FaCaretDown /> */}
				</h2>
				<p>최대 3개까지 선택 가능</p>
			</div>

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
					{selectedDists.map((dist) => (
						<span className="chip" key={dist.code}>
							<span>{dist.name}</span>
							<span role="presentation" onClick={() => handleDeleteClick(dist)}>
								X
							</span>
						</span>
					))}
				</div>
			</div>
		</StyledDistrictSelector>
	);
};

export default memo(DistrictSelector);
