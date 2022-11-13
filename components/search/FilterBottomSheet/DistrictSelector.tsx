import React, { memo, useEffect, useState } from "react";
import { Icon } from "../../../shared/components";
import { MAX_DISTRICT_CHIPS } from "../../../shared/constants";
import { DIVISIONS_DATA } from "../divisions";
import { StyledDistrictSelector } from "./styles/districtSelectorStyle";
import type {
	DistrictType,
	DivisionType,
	SelectedDistrictType,
} from "../types";
import type { Dispatch, SetStateAction } from "react";

// TODO: useRegCode 제거

type DistrictSelectorProps = {
	selectedDists: DistrictType[];
	setSelectedDists: Dispatch<SetStateAction<DistrictType[]>>;
};

const isAllDiv = (code: string) => code.substring(0, 2) === "00";
const isAllDist = (code: string) => code.substring(2, 4) === "00";

const DistrictSelector = ({
	selectedDists,
	setSelectedDists,
}: DistrictSelectorProps) => {
	const [divisionList, setDivisionList] =
		useState<DivisionType[]>(DIVISIONS_DATA);

	const districtList = divisionList.find((d) => d.selected)?.districts || [];

	useEffect(() => {
		// 선택 지역이 없으면 전국 선택으로 자동 설정됨
		if (!selectedDists.length) {
			const newData = divisionList.map((div) => ({
				...div,
				selected: isAllDiv(div.code),
			}));
			setDivisionList(newData);
		}
	}, [selectedDists]);

	useEffect(() => {
		// 선택 칩 업데이트
		if (!districtList.length) {
			setSelectedDists([{ name: "전국", code: "0000000000", selected: true }]);
			return;
		}

		const selectedDivName =
			divisionList.find((div) => div.selected)?.name || "";

		const newData = districtList
			.filter((dist) => dist.selected && !isAllDiv(dist.code))
			.map((dist) => ({ ...dist, name: `${selectedDivName} ${dist.name}` }));

		setSelectedDists(newData);
	}, [districtList]);

	const handleDivClick = (code: string) => {
		const newData = divisionList.map((d) => ({
			...d,
			selected: d.code === code,
			districts: d.districts.map((dist) => ({
				...dist,
				selected: isAllDist(dist.code),
			})),
		}));

		setDivisionList(newData);
	};

	const handleDistClick = (code: string) => {
		if (isAllDist(code)) {
			const newData = divisionList.map((div) => {
				if (div.selected) {
					return {
						...div,
						districts: div.districts.map((dist) => ({
							...dist,
							selected: isAllDist(dist.code) ? !dist.selected : false,
						})),
					};
				}
				return div;
			});

			setDivisionList(newData);
			return;
		}

		const selected = districtList.filter((d) => d.selected).map((d) => d.code);
		if (selectedDists.length >= 3 && !selected.includes(code)) return;

		const newData = divisionList.map((div) => {
			if (div.selected) {
				return {
					...div,
					districts: div.districts.map((dist) => {
						if (isAllDist(dist.code)) {
							return {
								...dist,
								selected: false,
							};
						}
						return {
							...dist,
							selected: dist.code === code ? !dist.selected : dist.selected,
						};
					}),
				};
			}
			return div;
		});

		setDivisionList(newData);
	};

	const handleDeleteClick = (code: string) => {
		const newData = divisionList.map((div) => {
			if (div.selected) {
				return {
					...div,
					districts: div.districts.map((d) => ({
						...d,
						selected: d.code === code ? false : d.selected,
					})),
				};
			}
			return div;
		});

		setDivisionList(newData);
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
					{divisionList?.map((div: DivisionType) => (
						<li
							key={div.code}
							role="presentation"
							onClick={() => handleDivClick(div.code)}
							className={div.selected ? "selected" : ""}
						>
							{div.name}
						</li>
					))}
				</ul>
				<ul className="sub">
					{districtList.map((dist: DistrictType) => (
						<li
							key={dist.code}
							role="presentation"
							onClick={() => handleDistClick(dist.code)}
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
							<span
								role="presentation"
								onClick={() => handleDeleteClick(dist.code)}
							>
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
