import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { format } from "date-fns";
import Modal from "../../shared/components/Modal";
import Calendar from "../../shared/components/Calendar";
import DistrictSelector from "./DistrictSelector";
import { DateRangeType, RegCodeItem } from "../../types";
import { SearchModalProps } from "./types";
import { dateRangeAtom, districtAtom } from "../../state";

const SearchModal = ({ type, setCalendarOpen, setDisctrictSelectorOpen }: SearchModalProps) => {
	const setDateRange = useSetRecoilState(dateRangeAtom);
	const setDistricts = useSetRecoilState(districtAtom);
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
				setDateRange((prev) => ({
					...prev,
					startDate: format(startDate, "yyyyMMdd"),
					endDate: format(endDate, "yyyyMMdd"),
				}));
				setCalendarOpen(false);
				break;

			case "district":
				setDistricts(selectedDists);
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
					<Modal>
						<Calendar
							selectedRange={selectedRange}
							handleSelectRange={handleSelectRange}
							handleClickSubmit={() => handleSubmit({ modal: "dateRange" })}
						/>
					</Modal>
				);
				break;

			case "districtSelector":
				elements = (
					<Modal>
						<DistrictSelector
							selectedDists={selectedDists}
							setSelectedDists={setSelectedDists}
							handleSubmit={() => handleSubmit({ modal: "district" })}
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

export default SearchModal;
