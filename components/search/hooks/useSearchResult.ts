import { format } from "date-fns";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchSearchedEvents } from "../../../shared/apis/search";
import { searchFiltersAtom } from "../../../shared/state";
import { removeSpace } from "../../../shared/utils";
import type { ResultSortOptionKeys } from "../../../shared/types";

type useSearchResultProps = {
	sortOption: ResultSortOptionKeys;
};

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

	const { data: events, isLoading } = useQuery(
		[
			"resultEvents",
			searchType,
			placeName,
			bid,
			startDate,
			endDate,
			districts,
			sortOption,
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
				const eventsData = data
					?.map((e) => {
						const today = format(new Date(), "yyyyMMdd");
						const isEnd = today > e.endAt!;

						const event = { ...e, image: e.images[0], isEnd };
						delete event.images;
						return event;
					})
					.sort((a) => (a.isEnd ? 1 : -1));

				switch (sortOption) {
					case "dateAsc":
						return eventsData?.sort((a, b) => a.startAt - b.startAt);
					case "dateDsc":
						return eventsData?.sort((a, b) => b.startAt - a.startAt);
					case "alphabetAsc":
					default:
						return eventsData;
				}
			},
			refetchOnWindowFocus: false,
		}
	);

	return {
		isLoading,
		events,
	};
};

export default useSearchResult;
