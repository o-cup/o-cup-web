import axios from "axios";
import { isDateRangeOverlaps } from "../../shared/utils/dateHandlers";
import { supabase } from "../../supabaseClient";

export const fetchRegcodes = async (code?: string) => {
	const param = !code ? "*00000000" : `${code.split("0")[0]}*000000`;
	const res = await axios.get(`https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${param}`);
	return res;
};

export type FetchSearchedEventParams = {
	keyword: string;
	date?: { startDate: string; endDate: string };
};

export const fetchSearchedEvent = async ({ keyword, date }: FetchSearchedEventParams) => {
	const { startDate, endDate } = date!;

	const query = supabase.from("place_sort").select("*").eq("isApproved", true);
	let data;

	if (!keyword) return data;

	const { data: events } = await query;

	data = events?.filter((event) => {
		const { bias, place, organizer, district } = event;
		if (
			(bias && bias.includes(keyword)) ||
			(place && place.includes(keyword)) ||
			(organizer && organizer.includes(keyword)) ||
			(district && district.includes(keyword))
		) {
			return true;
		}
		return false;
	});

	if (!startDate) return data;

	data = data?.filter((event) => {
		const isOverLap = isDateRangeOverlaps(startDate, endDate, event.startAt, event.endAt);
		return isOverLap;
	});

	// TODO: district 테이블 코드로 변경 후 적용
	return data;
};

export default {};
