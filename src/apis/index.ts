import { ITEMS_PER_PAGE } from "../shared/constants";
import { supabase } from "../supabaseClient";
import { EventType, DetailType } from "../types";

const fetchEvents = async ({ pageParam = 1 }) => {
	const endAt = pageParam * ITEMS_PER_PAGE;
	const startAt = endAt - ITEMS_PER_PAGE === 0 ? endAt - ITEMS_PER_PAGE : endAt - ITEMS_PER_PAGE + 1;

	const { data } = await supabase.from("events").select("*").range(startAt, endAt);
	return data;
};

// todo: fetchEvents와 getEvents 병합하기
const getEvents = async () => {
	const { data, error } = await supabase.from("events");
	if (error) {
		throw new Error(`${error.message}: ${error.details}`);
	}
	return data;
};

const getDetail = async () => {
	const { data, error } = await supabase.from("detail");
	if (error) {
		throw new Error(`${error.message}: ${error.details}`);
	}
	return data;
};

const insertEvent = async (eventData: Partial<EventType>) => {
	const { data, error } = await supabase.from("events").insert([{ ...eventData }]);

	if (error) {
		throw new Error(`${error.message}: ${error.details}`);
	}
	return data;
};

const insertDetail = async (detailData: Partial<DetailType>) => {
	const { data, error } = await supabase.from("detail").insert([{ ...detailData }]);

	if (error) {
		throw new Error(`${error.message}: ${error.details}`);
	}
	return data;
};

export { fetchEvents, getEvents, getDetail, insertEvent, insertDetail };
export default {};
