import React, { useState } from "react";
import Modal from "../../shared/components/Modal";
import Calendar from "../../shared/components/Calendar";

type SearchModalProps = {
	type: "calendar" | "districtSelector";
	handleCloseModal: () => void;
};

const SearchModal = ({ type, handleCloseModal }: SearchModalProps) => {
	const [selectedRange, setSelectedRange] = useState({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});

	const handleSelectRange = (ranges: any) => {
		setSelectedRange(ranges.selection);
	};

	const conditionalRender = () => {
		let elements;

		switch (type) {
			case "calendar":
				elements = (
					<Modal handleClose={handleCloseModal}>
						<Calendar
							selectedRange={selectedRange}
							handleSelectRange={handleSelectRange}
							handleClickSubmit={() => console.log("---")}
						/>
					</Modal>
				);
				break;

			case "districtSelector":
				break;

			default:
				break;
		}
		return elements;
	};

	return <>{conditionalRender()}</>;
};

export default SearchModal;
