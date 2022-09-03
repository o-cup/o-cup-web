import React from "react";
import { useQuery } from "react-query";
import { fetchSearchedEvent } from "../../../apis/search";
import { StyledBiasProfile } from "./biasProfileStyle";

type BiasProfileProps = {
	biasName: string;
	imgUrl: string;
	handleClick: () => void;
	id: number;
};

const BiasProfile = ({ biasName, imgUrl, handleClick, id }: BiasProfileProps) => {
	const { data: events } = useQuery(["events", id], () => fetchSearchedEvent({ biasId: id }));
	if (!events?.length) return null;

	return (
		<StyledBiasProfile onClick={handleClick}>
			<div>
				<img alt={biasName} src={imgUrl} />
				<p>{biasName}</p>
			</div>
		</StyledBiasProfile>
	);
};

export default BiasProfile;
