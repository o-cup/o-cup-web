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
		].map((el, index) => ({
			index: index + 1,
			name: el,
			selected: false,
		})),
	},
	{
		index: 3,
		name: "부산",
		districts: [
			"전체",
			"강서구",
			"금정구",
			"남구",
			"동구",
			"동래구",
			"부산진구",
			"북구",
			"사상구",
			"사하구",
			"서구",
		].map((el, index) => ({
			index: index + 1,
			name: el,
			selected: false,
		})),
	},
	{
		index: 4,
		name: "대구",
		districts: ["전체", "남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군"].map((el, index) => ({
			index: index + 1,
			name: el,
			selected: false,
		})),
	},
	{
		index: 5,
		name: "인천",
		districts: [
			"전체",
			"계양구",
			"미추홀구",
			"남동구",
			"동구",
			"부평구",
			"서구",
			"연수구",
			"중구",
			"강화군",
			"옹진군",
		].map((el, index) => ({
			index: index + 1,
			name: el,
			selected: false,
		})),
	},
	{
		index: 6,
		name: "광주",
		districts: ["전체", "광산구", "남구", "동구", "북구", "서구"].map((el, index) => ({
			index: index + 1,
			name: el,
			selected: false,
		})),
	},
	{
		index: 7,
		name: "대전",
		districts: ["전체", "대덕구", "동구", "서구", "유성구", "중구"].map((el, index) => ({
			index: index + 1,
			name: el,
			selected: false,
		})),
	},
	{
		index: 10,
		name: "경기",
		districts: [
			"전체",
			"수원시",
			"고양시",
			"성남시",
			"용인시",
			"부천시",
			"안산시",
			"남양주시",
			"안양시",
			"화성시",
			"평택시",
			"의정부시",
			"시흥시",
		].map((el, index) => ({
			index: index + 1,
			name: el,
			selected: false,
		})),
	},
].map((item) => ({
	...item,
	selected: item.index === 1,
}));

export default {};