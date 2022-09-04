import axios from "axios";
import { RegCodeItem } from "../../types";
import { isDateRangeOverlaps } from "../../shared/utils/dateHandlers";
import { supabase } from "../../supabaseClient";

const fetchRegcodes = async (code?: string) => {
	const param = !code ? "*00000000" : `${code.split("0")[0]}*000000`;
	const res = await axios.get(`https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${param}`);
	return res;
};

export type FetchSearchedEventParams = {
	keyword?: string;
	date?: { startDate: string; endDate: string };
	biasId?: number;
	districts?: RegCodeItem[];
};

const fetchSearchedEvent = async ({ keyword, date, biasId, districts }: FetchSearchedEventParams) => {
	let query = supabase.from("place_sort").select("*").eq("isApproved", true);

	if (biasId) {
		query = query.contains("biasesId", [biasId]);
	}

	const { data: events } = await query;
	let data;
	data = events;

	if (!keyword) return data;

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

	if (date?.startDate) {
		const { startDate, endDate } = date;

		data = data?.filter((event) => {
			const isOverLap = isDateRangeOverlaps(startDate, endDate, event.startAt, event.endAt);
			return isOverLap;
		});
	}

	if (districts?.length) {
		const codes = districts.map((dist) => dist.code.substring(0, 4));

		data = data?.filter((event) => {
			const distCode = event.newDistrict.code.substring(0, 4);
			return codes.includes(distCode);
		});
	}

	return data;
};

export { fetchRegcodes, fetchSearchedEvent };
