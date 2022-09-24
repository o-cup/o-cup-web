import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { DetailType } from "../../../types";
import { StyledLocation } from "../styles/locationStyle";
import Map from "./Map";
import { copyToClipboard } from "../../../shared/utils/copyHandlers";
import Toast from "../../../shared/components/Toast";

function Location({ address }: Partial<DetailType>) {
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
				<h4>위치</h4>
				<Map address={address} />
				<p>
					{address || "카페 주소"}
					<FaRegCopy onClick={handleClickCopy} />
				</p>
			</StyledLocation>
			{isToast && <Toast setToast={setToast} text="주소가 복사되었습니다" />}
		</>
	);
}

export default Location;
