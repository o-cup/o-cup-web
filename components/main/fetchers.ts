import { supabase } from "../../supabaseClient";

export const fetchEventsByDate = async (date: string) => {
	const { data } = await supabase
		.from("events")
		.select("*")
		.eq("isApproved", true)
		.lte("startAt", date)
		.gte("endAt", date);

	return data?.map((item) => ({ ...item, image: item.images[0] }));
};

export const fetchBiasDataById = async (bids: string[]) => {
	const { data } = await supabase
		.from("people")
		.select("*")
		.in("id", bids)
		.order("name", { ascending: true });
	return data;
};

export const getBiasListData = async (date: string) => {
	const events = await fetchEventsByDate(date);
	const bids = Array.from(
		new Set(events?.map((event) => event.biasesId).flat())
	);
	const biasData = await fetchBiasDataById(bids);

	if (!biasData) return [];

	const birthdayItems = biasData.filter(
		(item) => item.birthday.slice(-4) === date.slice(-4)
	);
	const sortedArray = [
		...birthdayItems,
		...biasData.filter((item) => item.birthday.slice(-4) !== date.slice(-4)),
	];
	return sortedArray;
};

export default {};
