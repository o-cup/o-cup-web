import React, { useState } from "react";
import Icon from "../Icon/Icons";
import StyledSort from "./sortStyle";

type SortProps = {
	options: Record<string, string>;
};

const Sort = ({ options }: SortProps) => {
	const [isOpened, setIsOpened] = useState(false);

	const optionKeys = Object.keys(options) as Array<keyof SortProps["options"]>;

	return (
		<StyledSort onClick={() => setIsOpened(!isOpened)}>
			<Icon name="sort" />
			{isOpened && (
				<ul>
					{optionKeys.map((option) => (
						<li key={option}>{options[option]}</li>
					))}
				</ul>
			)}
		</StyledSort>
	);
};

export default Sort;
