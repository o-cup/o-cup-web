import { supabase } from "../supabaseClient";
import { EventType, DetailType } from "../types";

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
  const { data, error } = await supabase.from("events")
    .insert([
      { ...eventData }
    ]);

  if (error) {
    throw new Error(`${error.message}: ${error.details}`);
  }
  console.log(data)
  return data;
};

const insertDetail = async (detailData: Partial<DetailType>) => {
  const { data, error } = await supabase.from("detail")
    .insert([
      { ...detailData }
    ]);

  if (error) {
    throw new Error(`${error.message}: ${error.details}`);
  }
  console.log(data)
  return data;
};

export { getEvents, getDetail, insertEvent, insertDetail };
export default {};
