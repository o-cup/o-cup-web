import { supabase } from "../../supabaseClient";
import { ITEMS_PER_PAGE } from "../constants";
import { isOpenToday } from "../utils/dateHandlers";
import type { EventType, FetchEventParams } from "../types";

const fetchEvents = async ({
	pageParam = 1,
	infinite = false,
	date,
}: FetchEventParams) => {
	let query = supabase.from("place_sort").select("*").eq("isApproved", true);

	if (infinite) {
		const endAt = pageParam * ITEMS_PER_PAGE;
		const startAt =
			endAt - ITEMS_PER_PAGE === 0
				? endAt - ITEMS_PER_PAGE
				: endAt - ITEMS_PER_PAGE + 1;
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
const fetchEventById = async ({ id }: { id?: string }) => {
	const { data, error } = await supabase
		.from("events")
		.select("*")
		.eq("id", id);
	if (error) {
		throw new Error(`${error.message}: ${error.details}`);
	}
	return data?.[0];
};

/**
 * 인물 데이터 반환
 * @returns {PeopleType}
 */
const fetchPeople = async () => {
	const { data } = await supabase
		.from("people")
		.select("*")
		.order("name", { ascending: true });
	return data;
};

/**
 * 이벤트 등록 신청
 * */
const insertEvent = async (eventData: Partial<EventType>) => {
	const { data, error } = await supabase
		.from("events")
		.insert([{ ...eventData }]);
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
	const { data: bias } = await supabase
		.from("people")
		.select("name")
		.eq("id", id)
		.single();
	return bias?.name;
};

/**
 * poster storage에 파일 업로드 후 publicURL 받아오기
 * @param file event.target.files[0]
 * @returns publicURL
 */
const uploadPoster = async (file: any) => {
	const fileName = `public/image${Date.now()}.png`;
	const { data, error } = await supabase.storage
		.from("posters")
		.upload(fileName, file, {
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

/**
 * 인물 id로 인물 이름과 프로필사진 반환
 * @param id
 */
const fetchBiasData = async (id: string) => {
	const { data } = await supabase.from("people").select("*").eq("id", id);
	const { name, profilePic } = data?.[0] || {};

	return {
		name,
		image: profilePic,
	};
};

/**
 * 상세페이지 조회수 업데이트
 * @param id event id
 * @param prevViews 기존 조회수
 */
const updateViews = async (id: string, prevViews: number) => {
	const { data, error } = await supabase
		.from("events")
		.update({ views: prevViews + 1 })
		.eq("id", id);
	if (error) {
		throw new Error(`${error.message}: ${error.details}`);
	}
	return data;
};

export {
	fetchEvents,
	fetchEventById,
	fetchPeople,
	insertEvent,
	fetchBiases,
	uploadPoster,
	fetchDuplicatedEvent,
	fetchBiasData,
	updateViews,
};
export default {};
