export const ITEMS_PER_PAGE = 20;
export const MAX_DISTRICT_CHIPS = 3;

export const DEFAULT_POSTER_URL =
	"https://qxcfvgkruqxdxfhrkgzu.supabase.co/storage/v1/object/public/posters/public/default_poster.png";

export const DEFAULT_TITLE = "오늘의 컵홀더";
export const DEFAULT_DESCRIPTION =
	"응원하는 아티스트의 생일 이벤트를 오늘의 컵홀더에서 확인해보세요!";
export const DEFAULT_URL = "o-cup.kr";
export const LOGO_URL = "https://www.o-cup.kr/images/ocup_profile.jpg";

export const CATEGORY_DATA = {
	A: "카페",
	B: "꽃집",
	C: "식당",
	D: "포토부스",
	E: "기타",
} as Record<string, string>;

export const initialCategoryData = ["A", "B", "C", "D", "E"].map((c) => ({
	code: c,
	name: CATEGORY_DATA[c],
	selected: false,
}));

export default {};
