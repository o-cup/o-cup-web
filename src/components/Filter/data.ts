export const divisionList = [
	{ index: 1, name: "전국", districts: [] },
	{
		index: 2,
		name: "서울",
		districts: [
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
		],
	},
	{
		index: 3,
		name: "부산",
		districts: ["강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구"],
	},
].map((item) => ({
	...item,
	selected: false,
}));

export default {};
