import axios from "axios";
import { SearchInputOptionKey } from "../../types";
import { RegCodeItem } from "../../components/search/types";
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
	biasId?: number | null;
	districts?: RegCodeItem[];
	searchInputOptionKey?: SearchInputOptionKey;
};

const fetchSearchedEvent = async ({ keyword, date, districts, searchInputOptionKey }: FetchSearchedEventParams) => {
	const { data: allEvents } = await supabase.from("place_sort").select("*").eq("isApproved", true);
	let data;

	if (!keyword) return data;

	if (searchInputOptionKey === "bias") {
		const { data: biasData } = await supabase.from("people").select("*");

		const searchedBiasId = biasData?.filter((row) => {
			const { name, enName, koName, realName } = row;

			if (
				name.includes(keyword) ||
				(enName && enName.includes(keyword)) ||
				(enName && enName.includes(keyword.toUpperCase())) ||
				(enName && enName.includes(keyword.toLowerCase())) ||
				(koName && koName.includes(keyword)) ||
				(realName && realName.includes(keyword))
			) {
				return true;
			}
			return false;
		});

		const biasId = searchedBiasId?.map((bias) => bias.id);
		if (biasId?.length) {
			data = allEvents?.filter((event) => event.biasesId.includes(biasId[0]));
		}
	}

	if (searchInputOptionKey === "place") {
		data = allEvents?.filter((event) => event.place.includes(keyword));
	}

	if (searchInputOptionKey === "organizer") {
		data = allEvents?.filter((event) => event.organizer.includes(keyword) || event.snsId.includes(keyword));
	}

	if (date?.startDate) {
		const { startDate, endDate } = date;

		data = data?.filter((event) => {
			const isOverLap = isDateRangeOverlaps(startDate, endDate, event.startAt, event.endAt);
			return isOverLap;
		});
	}

	if (!districts?.length) return data;

	const isAllDist = districts?.length === 1 && districts[0].code.slice(-8) === "00000000";
	if (isAllDist) {
		const searchedDist = districts?.[0].code;

		data = data?.filter((event) => {
			const distCode = event.newDistrict.code.substring(0, 2);
			return searchedDist.includes(distCode);
		});

		return data;
	}

	const codes = districts.map((dist) => dist.code.substring(0, 4));

	data = data?.filter((event) => {
		const distCode = event.newDistrict.code.substring(0, 4);
		return codes.includes(distCode);
	});

	return data;
};

const fetchEventsByBiasId = async (id: number) => {
	const query = supabase.from("place_sort").select("*").eq("isApproved", true).contains("biasesId", [id]);
	const { data } = await query;
	return data;
};

export { fetchRegcodes, fetchSearchedEvent, fetchEventsByBiasId };
