import { supabase } from "../supabaseClient";

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

export { getEvents, getDetail };
export default {};
