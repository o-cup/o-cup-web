import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchSearchedEvents } from "../../../shared/apis/search";
import { searchFiltersAtom } from "../../../shared/state";
import { removeSpace } from "../../../shared/utils";
import type { ResultSortOptionKeys, EventType } from "../../../shared/types";

type useSearchResultProps = {
	sortOption: ResultSortOptionKeys;
};

export type ResultType = {
	isEnd: boolean;
	image: string;
} & EventType;

const useSearchResult = ({ sortOption }: useSearchResultProps) => {
	const searchFilters = useRecoilValue(searchFiltersAtom);
	const {
		searchType,
		bid,
		placeName,
		date: { startDate, endDate },
		districts,
		categories,
	} = searchFilters;
	const [events, setEvents] = useState<ResultType[]>([]);
	const [endedEvents, setEndedEvents] = useState<ResultType[]>([]);

	const { data: result, isLoading } = useQuery(
		[
			"resultEvents",
			searchType,
			placeName,
			bid,
			startDate,
			endDate,
			districts,
			categories,
		],
		() =>
			fetchSearchedEvents({
				searchType,
				placeName: removeSpace(placeName.trim()),
				bid: bid!,
				date: {
					startDate: startDate ? format(new Date(startDate), "yyyyMMdd") : "",
					endDate: endDate ? format(new Date(endDate), "yyyyMMdd") : "",
				},
				districts,
				categories,
			}),
		{
			select: (data) => {
				const eventsData = data?.map((e) => {
					const today = format(new Date(), "yyyyMMdd");
					const isEnd = today > e.endAt!;
					const event = { ...e, image: e.images[0], isEnd };
					delete event.images;
					return event;
				});
				return eventsData;
			},
			refetchOnWindowFocus: false,
		}
	);

	const availables = result?.filter((el) => !el.isEnd);
	const unavailables = result?.filter((el) => el.isEnd);

	useEffect(() => {
		if (availables?.length) {
			setEvents(availables);
		}

		if (unavailables?.length) {
			setEndedEvents(unavailables);
		}
	}, [result]);

	useEffect(() => {
		switch (sortOption) {
			case "dateAsc":
				if (availables?.length) {
					setEvents(availables.sort((a, b) => a.startAt - b.startAt));
				}
				if (unavailables?.length) {
					setEndedEvents(unavailables.sort((a, b) => a.startAt - b.startAt));
				}
				break;

			case "dateDsc":
				if (availables?.length) {
					setEvents(availables.sort((a, b) => b.startAt - a.startAt));
				}
				if (unavailables?.length) {
					setEndedEvents(unavailables.sort((a, b) => b.startAt - a.startAt));
				}
				break;
			case "alphabetAsc":
			default:
				if (availables?.length) {
					setEvents(availables);
				}
				if (unavailables?.length) {
					setEndedEvents(unavailables);
				}
				break;
		}
	}, [sortOption]);

	return {
		isLoading,
		events,
		endedEvents,
	};
};

export default useSearchResult;
