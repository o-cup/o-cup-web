const divisionData = [
	{
		code: "1100000000",
		name: "서울",
	},
	{
		code: "2600000000",
		name: "부산",
	},
	{
		code: "2700000000",
		name: "대구",
	},
	{
		code: "2800000000",
		name: "인천",
	},
	{
		code: "2900000000",
		name: "광주",
	},
	{
		code: "3000000000",
		name: "대전",
	},
	{
		code: "3100000000",
		name: "울산",
	},
	{
		code: "4100000000",
		name: "경기",
	},
	{
		code: "4200000000",
		name: "강원",
	},
	{
		code: "4300000000",
		name: "충북",
	},
	{
		code: "4400000000",
		name: "충남",
	},
	{
		code: "4500000000",
		name: "전북",
	},
	{
		code: "4600000000",
		name: "전남",
	},
	{
		code: "4700000000",
		name: "경북",
	},
	{
		code: "4800000000",
		name: "경남",
	},
	{
		code: "5000000000",
		name: "제주",
	},
].map((div) => ({ ...div, selected: div.code === "1100000000" }));

export default divisionData;
