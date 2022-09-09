import { ITEMS_PER_PAGE } from "../shared/constants";
import { isOpenToday } from "../shared/utils/dateHandlers";
import { supabase } from "../supabaseClient";
import { EventType, DetailType, FetchEventParams, SearchSortOptions } from "../types";

const fetchEvents = async ({ pageParam = 1, infinite = false, date }: FetchEventParams) => {
	let query = supabase.from("place_sort").select("*").eq("isApproved", true);

	if (infinite) {
		const endAt = pageParam * ITEMS_PER_PAGE;
		const startAt = endAt - ITEMS_PER_PAGE === 0 ? endAt - ITEMS_PER_PAGE : endAt - ITEMS_PER_PAGE + 1;
		query = query.range(startAt, endAt);
	}

	if (date) {
		const { data: events } = await query;
		const filteredData = events?.filter((event) => {
			const { startAt, endAt } = event;
			if (isOpenToday(date, startAt, endAt)) {
				return true;
			}
			return false;
		});
		return filteredData;
	}

	const { data } = await query;
	return data;
};

/**
 * 아이디가 일치하는 event 데이터 반환
 * @param {string} id
 * @returns {EventType}
 */
const fetchEvent = async ({ id }: { id?: string }) => {
	const { data, error } = await supabase.from("events").select("*").eq("id", id);
	if (error) {
		throw new Error(`${error.message}: ${error.details}`);
	}
	return data?.[0];
};

/**
 * 아이디가 일치하는 detail 데이터 반환
 * @param {string} id
 * @returns {DetailType}
 */
const fetchDetail = async ({ id }: { id?: string }) => {
	const { data, error } = await supabase.from("detail").select("*").eq("id", id);
	if (error) {
		throw new Error(`${error.message}: ${error.details}`);
	}
	return data?.[0];
};

/**
 * 아이디가 일치하는 { ...event, ...detail } 데이터 통합하여 반환
 * @param {string} id
 * @returns {EventType & DetailType}
 */
const fetchEventDetail = async ({ id }: { id?: string }) => {
	const event = await fetchEvent({ id });
	const detail = await fetchDetail({ id });

	return { ...event, ...detail };
};

/**
 * 인물 데이터 반환
 * @returns {PeopleType}
 */
const fetchPeople = async (sortOption?: SearchSortOptions) => {
	let query = supabase.from("people").select("*");

	switch (sortOption) {
		case "birthdayAsc":
			break;

		case "birthdayDsc":
			break;

		case "alphabetAsc":
		default:
			query = query.order("name", { ascending: true });
			break;
	}

	const { data } = await query;
	return data;
};

/**
 * 이벤트 추가
 * */
const insertEvent = async (eventData: Partial<EventType>) => {
	const { data, error } = await supabase.from("events").insert([{ ...eventData }]);
	if (error) {
		throw new Error(`${error.message}: ${error.details}`);
	}
	return data;
};

/**
 * 디테일 추가
 * */
const insertDetail = async (detailData: Partial<DetailType>) => {
	const { data, error } = await supabase.from("detail").insert([{ ...detailData }]);
	if (error) {
		throw new Error(`${error.message}: ${error.details}`);
	}
	return data;
};

/**
 * 인물 id로 이름 받아오기
 * @param {number} id
 * @returns {string} name
 * */
const fetchBiases = async ({ id }: { id: number }) => {
	const { data: bias } = await supabase.from("people").select("name").eq("id", id).single();
	return bias?.name;
};

/**
 * poster storage에 파일 업로드 후 publicURL 받아오기
 * @param file event.target.files[0]
 * @returns publicURL
 */
const uploadPoster = async (file: any) => {
	const fileName = `public/image${Date.now()}.png`;
	const { data, error } = await supabase.storage.from("posters").upload(fileName, file, {
		cacheControl: "3600",
		upsert: false,
	});

	const { publicURL } = supabase.storage.from("posters").getPublicUrl(fileName);
	return publicURL;
};

/**
 * 장소와 이벤트 기간이 일치하는 event 반환
 * @param {string} id
 * @returns {EventType}
 */
const fetchDuplicatedEvent = async ({
	place,
	dateRange,
}: {
	place?: string;
	dateRange: { startAt: string; endAt: string };
}) => {
	const { data, error } = await supabase
		.from("events")
		.select("*")
		.match({ place, startAt: dateRange.startAt, endAt: dateRange.endAt });
	if (error) {
		throw new Error(`${error.message}: ${error.details}`);
	}
	return data?.[0];
};

export {
	fetchEvents,
	fetchEventDetail,
	fetchPeople,
	insertEvent,
	insertDetail,
	fetchBiases,
	uploadPoster,
	fetchDuplicatedEvent,
};
export default {};
