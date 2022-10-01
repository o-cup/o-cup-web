import React, { memo, useState } from "react";
import { useSetRecoilState } from "recoil";
import { format } from "date-fns";
import Modal from "../../shared/components/Modal";
import Calendar from "../../shared/components/Calendar";
import DistrictSelector from "./DistrictSelector";
import { DateRangeType } from "../../types";
import { RegCodeItem, SearchModalProps } from "./types";
import { searchFiltersAtom } from "../../state";

const SearchModal = ({ type, setCalendarOpen, setDisctrictSelectorOpen }: SearchModalProps) => {
	const setSearchFilters = useSetRecoilState(searchFiltersAtom);
	const [selectedRange, setSelectedRange] = useState<DateRangeType>({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});
	const [selectedDists, setSelectedDists] = useState<RegCodeItem[]>([]);

	const handleSelectRange = ({ selection }: { selection: DateRangeType }) => {
		setSelectedRange(selection);
	};

	const handleSubmit = ({ modal }: { modal: "dateRange" | "district" }) => {
		const { startDate, endDate } = selectedRange;

		switch (modal) {
			case "dateRange":
				setSearchFilters((prev) => ({
					...prev,
					date: { startDate: format(startDate, "yyyyMMdd"), endDate: format(endDate, "yyyyMMdd") },
				}));

				setCalendarOpen(false);
				break;

			case "district":
				setSearchFilters((prev) => ({ ...prev, districts: selectedDists }));
				setDisctrictSelectorOpen(false);
				break;

			default:
				break;
		}
	};

	const conditionalRender = () => {
		let elements;

		switch (type) {
			case "calendar":
				elements = (
					<Modal maxWidth={380} minWidth={330}>
						<Calendar
							selectedRange={selectedRange}
							setSelectedRange={setSelectedRange}
							handleSelectRange={handleSelectRange}
							handleClickSubmit={() => handleSubmit({ modal: "dateRange" })}
							setCalendarOpen={setCalendarOpen}
						/>
					</Modal>
				);
				break;

			case "districtSelector":
				elements = (
					<Modal maxWidth={380} minWidth={330}>
						<DistrictSelector
							selectedDists={selectedDists}
							setSelectedDists={setSelectedDists}
							handleSubmit={() => handleSubmit({ modal: "district" })}
							setDisctrictSelectorOpen={setDisctrictSelectorOpen}
						/>
					</Modal>
				);
				break;

			default:
				break;
		}
		return elements;
	};

	return <>{conditionalRender()}</>;
};

export default memo(SearchModal);
