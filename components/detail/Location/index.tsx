import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { Toast } from "../../../shared/components";
import { copyToClipboard } from "../../../shared/utils/copyHandlers";
import { StyledLocation } from "../styles/locationStyle";
import Map from "./Map";
import type { EventType } from "../../../shared/types";

function Location({ address }: Partial<EventType>) {
	const [isToast, setToast] = useState(false);

	const handleClickCopy = () => {
		if (address) {
			copyToClipboard(address);
			setToast(true);
		}
	};

	return (
		<>
			<StyledLocation>
				<p className="title">위치</p>
				<Map address={address} />
				<p className="address">
					{address || "카페 주소"}
					<FaRegCopy onClick={handleClickCopy} />
				</p>
			</StyledLocation>
			{isToast && <Toast setToast={setToast} text="주소가 복사되었습니다" />}
		</>
	);
}

export default Location;
