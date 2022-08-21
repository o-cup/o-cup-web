import React, { Dispatch, SetStateAction, useState } from "react";
import Modal from "../../shared/components/Modal";
import Calendar from "../../shared/components/Calendar";
import DistrictSelector from "./DistrictSelector";

type SearchModalProps = {
	type: "calendar" | "districtSelector";
	setCalendarOpen: Dispatch<SetStateAction<boolean>>;
	setDisctrictSelectorOpen: Dispatch<SetStateAction<boolean>>;
};

const SearchModal = ({ type, setCalendarOpen, setDisctrictSelectorOpen }: SearchModalProps) => {
	const [selectedRange, setSelectedRange] = useState({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});

	const handleSelectRange = (ranges: any) => {
		setSelectedRange(ranges.selection);
	};

	const handleSubmit = ({ modal }: { modal: "district" | "dateRange" }) => {
		if (modal === "dateRange") {
			setCalendarOpen(false);
			return;
		}

		if (modal === "district") {
			setDisctrictSelectorOpen(false);
		}
	};

	const conditionalRender = () => {
		let elements;

		// TODO: 날짜 범위 선택
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
