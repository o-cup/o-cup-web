import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { format } from "date-fns";
import Modal from "../../shared/components/Modal";
import Calendar from "../../shared/components/Calendar";
import DistrictSelector from "./DistrictSelector";
import { DateRangeType } from "../../types";
import { SearchModalProps } from "./types";
import { dateRangeAtom } from "../../state";

const SearchModal = ({ type, setCalendarOpen, setDisctrictSelectorOpen }: SearchModalProps) => {
	const setDateRange = useSetRecoilState(dateRangeAtom);
	const [selectedRange, setSelectedRange] = useState<DateRangeType>({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});

	const handleSelectRange = ({ selection }: { selection: DateRangeType }) => {
		setSelectedRange(selection);
	};

	const handleSubmit = ({ modal }: { modal: "district" | "dateRange" }) => {
		if (modal === "dateRange") {
			const { startDate, endDate } = selectedRange;

			setDateRange((prev) => ({
				...prev,
				startDate: format(startDate, "yyyyMMdd"),
				endDate: format(endDate, "yyyyMMdd"),
			}));
			setCalendarOpen(false);
			return;
		}

		if (modal === "district") {
			setDisctrictSelectorOpen(false);
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
						<DistrictSelector handleSubmit={() => handleSubmit({ modal: "district" })} />
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
