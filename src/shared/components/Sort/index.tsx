import React, { useState } from "react";
import Icon from "../Icon/Icons";
import StyledSort from "./sortStyle";

type Options = {
	alphabetAsc: string;
	dateAsc: string;
	dateDsc: string;
};

const Sort = () => {
	const [isOpened, setIsOpened] = useState(false);

	const options = {
		alphabetAsc: "가나다순",
		dateAsc: "날짜 빠른 순",
		dateDsc: "날짜: 느린 순",
	};

	const optionKeys = Object.keys(options) as Array<keyof Options>;

	return (
		<StyledSort onClick={() => setIsOpened(!isOpened)}>
			<Icon name="sort" />
			<ul>
				{optionKeys.map((option) => (
					<li key={option}>{options[option]}</li>
				))}
			</ul>
		</StyledSort>
	);
};

export default Sort;
