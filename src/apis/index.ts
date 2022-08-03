import { ITEMS_PER_PAGE } from "../shared/constants";
import { supabase } from "../supabaseClient";
import { EventType, DetailType, FetchEventParams } from "../types";

const fetchEvents = async ({ pageParam = 1, infinite = false, keyword }: FetchEventParams) => {
	let query = supabase.from("events").select("*");

	if (infinite) {
		const endAt = pageParam * ITEMS_PER_PAGE;
		const startAt = endAt - ITEMS_PER_PAGE === 0 ? endAt - ITEMS_PER_PAGE : endAt - ITEMS_PER_PAGE + 1;
		query = query.range(startAt, endAt);
	}

	if (keyword) {
		query = query.textSearch("place", keyword);
	}

	const { data } = await query;
	return data;
};

const fetchDetail = async ({ id }: { id?: string }) => {
	const { data, error } = await supabase.from("detail").select("*").eq("id", id);
	if (error) {
		throw new Error(`${error.message}: ${error.details}`);
	}
	return data?.[0];
};

const fetchPeople = async () => {
	const { data, error } = await supabase.from("people").select("*");
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

export { fetchEvents, fetchDetail, fetchPeople, insertEvent, insertDetail };
export default {};
