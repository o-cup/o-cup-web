import axios from "axios";
import { supabase } from "../../supabaseClient";
import { SearchFiltersAtomType } from "../state/atoms";
import { getBiasIdByKeyword, removeSpace } from "../utils";
import { isDateRangeOverlaps } from "../utils/dateHandlers";
import type { RegCodeItem, SearchInputOptionKey } from "../types";

export type FetchSearchedEventParams = {
	searchType: string;
	bid?: number;
	placeName?: string;
	date?: { startDate: string; endDate: string };
	biasId?: number | null;
	districts?: RegCodeItem[];
	searchInputOptionKey?: SearchInputOptionKey;
};

export const fetchSearchedEvents = async ({
	searchType,
	bid,
	placeName,
	date,
	districts,
}: FetchSearchedEventParams) => {
	const { data: allEvents } = await supabase
		.from("place_sort")
		.select("*")
		.eq("isApproved", true);
	let data;

	if (searchType === "bias") {
		data = allEvents?.filter((event) => event.biasesId.includes(bid));
	}

	if (searchType === "place") {
		if (!placeName) return [];

		data = allEvents?.filter((event) => {
			const { place } = event;
			if (
				place &&
				removeSpace(place).toUpperCase().includes(placeName.toUpperCase())
			) {
				return true;
			}
			return false;
		});
	}

	if (date?.startDate) {
		const { startDate, endDate } = date;

		data = data?.filter((event) => {
			const isOverLap = isDateRangeOverlaps(
				startDate,
				endDate,
				event.startAt,
				event.endAt
			);
			return isOverLap;
		});
	}

	if (!districts?.length) return data;

	const isAllDist =
		districts?.length === 1 && districts[0].code.slice(-8) === "00000000";
	if (isAllDist) {
		const searchedDist = districts?.[0].code;

		data = data?.filter((event) => {
			const distCode = event.districts.code.substring(0, 2);
			return searchedDist.includes(distCode);
		});

		return data;
	}

	const codes = districts.map((dist) => dist.code.substring(0, 4));

	data = data?.filter((event) => {
		const distCode = event.districts.code.substring(0, 4);
		return codes.includes(distCode);
	});

	return data;
};

export const fetchEventsByBiasId = async (id: number) => {
	const query = supabase
		.from("place_sort")
		.select("*")
		.eq("isApproved", true)
		.contains("biasesId", [id]);
	const { data } = await query;
	return data;
};

export const fetchBiasDataByKeyword = async (keyword: string) => {
	const { data: biasesData } = await supabase.from("people").select("*");

	const biasData = biasesData?.find((bd) => {
		if (
			bd.name.includes(keyword) ||
			bd.enName?.includes(keyword) ||
			bd.koName?.includes(keyword) ||
			bd.realName?.includes(keyword)
		) {
			return true;
		}
		return false;
	});

	return biasData;
};
