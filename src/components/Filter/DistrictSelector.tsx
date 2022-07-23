import React from "react";
import { Chip, SelectList, StyledDistrictSelector } from "../../styles/districtSelectorStyle";

const selected = ["전국", "세글자", "서울시 마포구"];

const districtMain = [
	"전국",
	"서울",
	"부산",
	"대구",
	"인천",
	"광주",
	"대전",
	"울산",
	"세종",
	"경기",
	"강원",
	"충북",
	"충남",
	"전북",
	"전남",
	"경북",
	"경남",
	"제주",
];

const districtSub = [
	"전체",
	"강남구",
	"강동구",
	"강북구",
	"강서구",
	"관악구",
	"광진구",
	"구로구",
	"금천구",
	"노원구",
	"도봉구",
	"동대문구",
	"동작구",
	"마포구",
	"서대문구",
	"서초구",
	"성동구",
	"성북구",
	"송파구",
	"양천구",
	"영등포구",
	"용산구",
	"은평구",
	"종로구",
	"중구",
	"중랑구",
];

const DistrictSelector = () => (
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
					{districtMain.map((item) => (
						<li key={item}>{item}</li>
					))}
				</SelectList>
			</div>
			<div>
				<h6>상세지역</h6>
				<SelectList className="sub">
					{districtSub.map((item) => (
						<li key={item}>{item}</li>
					))}
				</SelectList>
			</div>
		</div>
		<div className="selected">
			<div className="chipsContainer">
				{selected.map((item) => (
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

export default DistrictSelector;
